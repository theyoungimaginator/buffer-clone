const express = require('express');
const { generateCaption, suggestHashtags, rewriteContent } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(protect); // All AI routes are protected

router.post('/generate-caption', generateCaption);
router.post('/suggest-hashtags', suggestHashtags);
router.post('/rewrite-content', rewriteContent);

module.exports = router;