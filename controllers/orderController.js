const { validationResult } = require('express-validator');
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { order_id, customer_id, order_amount, order_date } = req.body;

    try {
        const order = new Order({
            order_id,
            customer_id,
            order_amount,
            order_date
        });

        await order.save();
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
