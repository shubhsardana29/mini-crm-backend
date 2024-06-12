const mongoose = require('mongoose');

const AudienceSchema = new mongoose.Schema({
    rules: [{ field: String, operator: String, value: mongoose.Schema.Types.Mixed }],
    logic: { type: String, enum: ['AND', 'OR'], required: true }
});

module.exports = mongoose.model('Audience', AudienceSchema);
