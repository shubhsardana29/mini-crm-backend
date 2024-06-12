const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    customer_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    total_spends: { type: Number, required: true },
    last_visit_date: { type: Date, required: true },
    visit_count: { type: Number, required: true }
});

module.exports = mongoose.model('Customer', CustomerSchema);