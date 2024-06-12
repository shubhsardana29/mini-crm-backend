const { validationResult } = require('express-validator');
const Audience = require('../models/Audience');
const Customer = require('../models/Customer');

exports.createAudience = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rules, logic } = req.body;

    try {
        const audience = new Audience({ rules, logic });
        await audience.save();
        res.status(201).json({ message: 'Audience created successfully', audienceId: audience._id });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAudienceSize = async (req, res) => {
    const { rules, logic } = req.body;

    try {
        const query = buildQuery(rules, logic);
        const size = await Customer.countDocuments(query);
        res.status(200).json({ size });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

function buildQuery(rules, logic) {
    const query = rules.map(rule => {
        let condition = {};
        switch (rule.operator) {
            case '>':
                condition[rule.field] = { $gt: rule.value };
                break;
            case '>=':
                condition[rule.field] = { $gte: rule.value };
                break;
            case '<':
                condition[rule.field] = { $lt: rule.value };
                break;
            case '<=':
                condition[rule.field] = { $lte: rule.value };
                break;
            case '=':
                condition[rule.field] = rule.value;
                break;
        }
        return condition;
    });

    return logic === 'AND' ? { $and: query } : { $or: query };
}
