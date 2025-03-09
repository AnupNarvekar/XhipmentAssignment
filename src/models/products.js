// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
