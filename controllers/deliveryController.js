const { validationResult } = require('express-validator');
const Campaign = require('../models/Campaign');

exports.sendCampaign = async (req, res) => {
    const { campaign_id } = req.body;

    try {
        const campaign = await Campaign.findById(campaign_id);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        // Simulate sending messages
        setTimeout(() => {
            const deliveryStatus = Math.random() < 0.9 ? 'SENT' : 'FAILED';
            campaign.status = deliveryStatus;
            campaign.save();
        }, 1000);

        res.status(200).json({ message: 'Campaign sent', status: 'IN_PROGRESS' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deliveryReceipt = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { communication_log_id, status } = req.body;

    try {
        const campaign = await Campaign.findById(communication_log_id);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        campaign.status = status;
        await campaign.save();
        res.status(200).json({ message: 'Status updated' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
