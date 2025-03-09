const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ productId: String, quantity: Number }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Processed', 'Failed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);
