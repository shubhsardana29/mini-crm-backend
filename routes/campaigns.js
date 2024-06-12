const express = require('express');
const { body } = require('express-validator');
const campaignController = require('../controllers/campaignController');
const router = express.Router();

router.post(
    '/',
    [
        body('audience_id').not().isEmpty().withMessage('Audience ID is required'),
        body('message').not().isEmpty().withMessage('Message is required')
    ],
    campaignController.createCampaign
);

router.get(
    '/',
    campaignController.getCampaigns
);

module.exports = router;
