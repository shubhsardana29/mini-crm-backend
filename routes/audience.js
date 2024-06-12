const express = require('express');
const { body } = require('express-validator');
const audienceController = require('../controllers/audienceController');
const router = express.Router();

router.post(
    '/',
    [
        body('rules').isArray().withMessage('Rules must be an array'),
        body('logic').isIn(['AND', 'OR']).withMessage('Logic must be AND or OR')
    ],
    audienceController.createAudience
);

router.post(
    '/size',
    [
        body('rules').isArray().withMessage('Rules must be an array'),
        body('logic').isIn(['AND', 'OR']).withMessage('Logic must be AND or OR')
    ],
    audienceController.getAudienceSize
);

module.exports = router;
