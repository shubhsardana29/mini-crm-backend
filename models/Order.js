const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    order_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    order_amount: { type: Number, required: true },
    order_date: { type: Date, required: true }
});

module.exports = mongoose.model('Order', OrderSchema);
