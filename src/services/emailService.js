const { ses } = require('../config/aws');
require('dotenv').config();

const sendOrderNotification = (order, userEmail) => {
    const params = {
        Source: process.env.SES_VERIFIED_EMAIL,
        Destination: {
            ToAddresses: [userEmail]
        },
        Message: {
            Subject: { Data: `Order ${order.id} Processed` },
            Body: {
                Text: { Data: `Your order ${order.id} has been successfully processed. Items: ${JSON.stringify(order.items)}` }
            }
        }
    };

    return new Promise((resolve, reject) => {
        ses.sendEmail(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

module.exports = sendOrderNotification;

