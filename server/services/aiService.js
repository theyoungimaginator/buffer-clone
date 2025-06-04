const { getGroqCompletion } = require('../utils/groqAI');

async function generateCaption(text, platform, tone = 'neutral') {
    const prompt = `You are an expert social media copywriter. Write a concise and engaging caption for a ${platform} post based on the following content: "${text}". The tone should be ${tone}. Include relevant emojis if appropriate for the platform. Ensure it's suitable for ${platform}.`;
    const messages = [{ role: 'user', content: prompt }];
    try {
        const caption = await getGroqCompletion(messages, 'mixtral-8x7b-32768', { maxTokens: 200, temperature: 0.8 });
        return caption;
    } catch (error) {
        console.error('Error generating caption:', error);
        throw new Error('Could not generate caption with AI.');
    }
}

async function suggestHashtags(text, count = 5) {
    const prompt = `Suggest ${count} highly relevant and trending hashtags for the following social media post content: "${text}". Provide only the hashtags, separated by spaces or commas, without any other text.`;
    const messages = [{ role: 'user', content: prompt }];
    try {
        const result = await getGroqCompletion(messages, 'mixtral-8x7b-32768', { maxTokens: 100, temperature: 0.5 });
        const hashtags = result.split(/[\s,]+/).filter(tag => tag.startsWith('#') && tag.length > 1);
        return hashtags.slice(0, count);
    } catch (error) {
        console.error('Error suggesting hashtags:', error);
        throw new Error('Could not suggest hashtags with AI.');
    }
}

async function rewriteContent(text, tone) {
    const prompt = `Rewrite the following text in a ${tone} tone: "${text}"`;
    const messages = [{ role: 'user', content: prompt }];
    try {
        const rewrittenText = await getGroqCompletion(messages, 'mixtral-8x7b-32768', { maxTokens: 300, temperature: 0.9 });
        return rewrittenText;
    } catch (error) {
        console.error('Error rewriting content:', error);
        throw new Error('Could not rewrite content with AI.');
    }
}

module.exports = {
    generateCaption,
    suggestHashtags,
    rewriteContent,
};