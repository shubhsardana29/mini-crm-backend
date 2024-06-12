const express = require('express');
const { body } = require('express-validator');
const customerController = require('../controllers/customerController');
const router = express.Router();

router.post(
    '/',
    [
        body('customer_id').not().isEmpty().withMessage('Customer ID is required'),
        body('name').not().isEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Email is invalid'),
        body('total_spends').isNumeric().withMessage('Total spends must be a number'),
        body('last_visit_date').isDate().withMessage('Last visit date is invalid'),
        body('visit_count').isInt().withMessage('Visit count must be an integer')
    ],
    customerController.createCustomer
);

module.exports = router;
