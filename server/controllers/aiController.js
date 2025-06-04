const aiService = require('../services/aiService');

exports.generateCaption = async (req, res, next) => {
    const { text, platform, tone } = req.body;
    if (!text || !platform) {
        return res.status(400).json({ success: false, error: 'Please provide text and platform.' });
    }
    try {
        const caption = await aiService.generateCaption(text, platform, tone);
        res.status(200).json({ success: true, data: { caption } });
    } catch (error) {
        console.error('AI caption generation failed:', error);
        res.status(500).json({ success: false, error: error.message || 'Failed to generate caption.' });
    }
};

exports.suggestHashtags = async (req, res, next) => {
    const { text, count } = req.body;
    if (!text) {
        return res.status(400).json({ success: false, error: 'Please provide text for hashtag suggestions.' });
    }
    try {
        const hashtags = await aiService.suggestHashtags(text, count);
        res.status(200).json({ success: true, data: { hashtags } });
    } catch (error) {
        console.error('AI hashtag suggestion failed:', error);
        res.status(500).json({ success: false, error: error.message || 'Failed to suggest hashtags.' });
    }
};

exports.rewriteContent = async (req, res, next) => {
    const { text, tone } = req.body;
    if (!text || !tone) {
        return res.status(400).json({ success: false, error: 'Please provide text and tone.' });
    }
    try {
        const rewrittenText = await aiService.rewriteContent(text, tone);
        res.status(200).json({ success: true, data: { rewrittenText } });
    } catch (error) {
        console.error('AI content rewrite failed:', error);
        res.status(500).json({ success: false, error: error.message || 'Failed to rewrite content.' });
    }
};