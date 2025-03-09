require('dotenv').config();
const { sqs, ses } = require('../config/aws');
const orders = require('../models/orders');
const redisClient = require('../config/redis');
const inventory = require('../models/inventory');
const sendOrderNotification = require('../services/emailService');
const users = require('../models/users');
require('../config/db');


const queueUrl = process.env.AWS_SQS_QUEUE_URL;

async function processOrder(orderId) {
    try {
        const order = await orders.findOne({ orderId });
        if (!order)
            return console.error('orders not found:', orderId);

        // Simulate order processing
        let processingStatus = 'Processed';
        for (const item of order.items) {
            const inventoryItem = await inventory.findOne({ productId: item.productId });
            if (!inventoryItem)
                return console.error('inventory not found:', item.productId);

            // Deduct ordered quantity
            inventoryItem.stock -= item.quantity;
            if (inventoryItem.stock < 0) {
                processingStatus = 'Failed';
            }
            await inventoryItem.save();
        }

        order.status = processingStatus;
        await order.save();

        // Update Redis cache
        await redisClient.setEx(`order:${orderId}`, 300, JSON.stringify(order));

        // Send email notification via AWS SES
        const {email} = await users.findOne({ _id: order.userId });
        sendOrderNotification(order, email);

    } catch (err) {
        console.error('Error processing order:', err);
    }
}

function pollQueue() {
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 10
    };

    sqs.receiveMessage(params, async (err, data) => {
        if (err) {
            console.error('Error receiving SQS message', err);
        }
        else if (data.Messages && data.Messages.length > 0) {
            const message = data.Messages[0];
            const { orderId } = JSON.parse(message.Body);
            await processOrder(orderId);

            // Delete message from SQS after processing
            const deleteParams = {
                QueueUrl: queueUrl,
                ReceiptHandle: message.ReceiptHandle
            };
            sqs.deleteMessage(deleteParams, (err, data) => {
                if (err) console.error('Error deleting message', err);
                else console.log('Message deleted from SQS');
            });
        }

        // Continue polling
        pollQueue();
    });
}

pollQueue();