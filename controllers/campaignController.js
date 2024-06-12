const { validationResult } = require('express-validator');
const Campaign = require('../models/Campaign');
const Audience = require('../models/Audience');

exports.createCampaign = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { audience_id, message } = req.body;

    try {
        const audience = await Audience.findById(audience_id);
        if (!audience) {
            return res.status(404).json({ error: 'Audience not found' });
        }

        const campaign = new Campaign({
            audience_id,
            message
        });

        await campaign.save();
        res.status(201).json({ message: 'Campaign created successfully', campaignId: campaign._id });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().sort({ _id: -1 });
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
