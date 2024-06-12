const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post(
    '/',
    [
        body('order_id').not().isEmpty().withMessage('Order ID is required'),
        body('customer_id').not().isEmpty().withMessage('Customer ID is required'),
        body('order_amount').isNumeric().withMessage('Order amount must be a number'),
        body('order_date').isDate().withMessage('Order date is invalid')
    ],
    orderController.createOrder
);

module.exports = router;
