const orders = require('../models/orders');
const inventory = require('../models/inventory');
const products = require('../models/products');
const { sqs } = require('../config/aws');
const redisClient = require('../config/redis');
const { v4: uuidv4 } = require('uuid');
const { STATUS: ORDER_STATUS } = require('../constants/order');


exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;

        if (!(items && items.length))
            return res.status(400).json({
                success: false,
                message: "No items provided"
            });

        let totalAmount = 0;

        // Validate inventory for each item
        for (const item of items) {
            const inventoryItem = await inventory.findOne({ productId: item.productId });

            if (!inventoryItem) {
                return res.status(400).json({ success: false, message: `Product ${item.productId} unavailable` });
            }
            else if (inventoryItem.stock < item.quantity) {
                return res.status(400).json({ error: `Product ${item.productId} is out of stock` });
            }
            else {
                const prd = await products.findOne({ sku: item.productId });
                console.log(prd);
                totalAmount += (prd.price * item.quantity);
            }
        }

        // Create the order
        const orderId = uuidv4();
        const orderData = new orders({
            orderId,
            userId: req.user.id,
            items,
            totalAmount,
            status: ORDER_STATUS.PENDING
        });
        await orderData.save();

        // Push the order to AWS SQS for asynchronous processing
        const params = {
            MessageBody: JSON.stringify({ orderId: orderId }),
            QueueUrl: process.env.AWS_SQS_QUEUE_URL
        };
        sqs.sendMessage(params, (err, data) => {
            if (err) {
                console.error('Error sending message to SQS', err);
            } else {
                console.log('order sent to SQS', data.MessageId);
            }
        });

        res.status(201).json({ message: 'order created and queued for processing', orderId: orderId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'order creation failed' });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;

        // If cache hit
        const cachedOrder = await redisClient.get(`order:${id}`);
        if (cachedOrder) {
            return res.json(JSON.parse(cachedOrder));
        }

        // If cache miss, fetch from MongoDB
        const order = await orders.findOne({ orderId: id });
        if (!order)
            return res.status(404).json({ error: 'order not found' });

        // Cache response and set expiration of 5 minutes
        await redisClient.setEx(`order:${id}`, 300, JSON.stringify(order));
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve order details' });
    }
};
