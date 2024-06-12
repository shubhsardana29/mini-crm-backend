const express = require('express');
const { body } = require('express-validator');
const deliveryController = require('../controllers/deliveryController');
const router = express.Router();

router.post(
    '/',
    [
        body('campaign_id').not().isEmpty().withMessage('Campaign ID is required')
    ],
    deliveryController.sendCampaign
);

router.post(
    '/deliveryReceipt',
    [
        body('communication_log_id').not().isEmpty().withMessage('Communication Log ID is required'),
        body('status').isIn(['SENT', 'FAILED']).withMessage('Status must be SENT or FAILED')
    ],
    deliveryController.deliveryReceipt
);

module.exports = router;
