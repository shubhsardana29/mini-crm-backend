const { validationResult } = require('express-validator');
const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { customer_id, name, email, total_spends, last_visit_date, visit_count } = req.body;

    try {
        const customer = new Customer({
            customer_id,
            name,
            email,
            total_spends,
            last_visit_date,
            visit_count
        });

        await customer.save();
        res.status(201).json({ message: 'Customer created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
