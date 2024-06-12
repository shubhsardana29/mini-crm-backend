const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    audience_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Audience', required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['SENT', 'FAILED'], default: 'SENT' }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
