const axios = require('axios');

const GROQ_API_BASE_URL = 'https://api.groq.com/openai/v1';
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
    console.warn("GROQ_API_KEY is not set in environment variables. AI features may not work.");
}

const groqClient = axios.create({
    baseURL: GROQ_API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
    },
});

async function getGroqCompletion(messages, model = 'mixtral-8x7b-32768', options = {}) {
    if (!GROQ_API_KEY) {
        throw new Error("Groq API key is not configured. Cannot make AI requests.");
    }
    try {
        const response = await groqClient.post('/chat/completions', {
            model: model,
            messages: messages,
            temperature: options.temperature || 0.7,
            max_tokens: options.maxTokens || 500,
            top_p: options.topP || 1,
            stream: false,
            ...options
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling Groq API:', error.response ? error.response.data : error.message);
        throw new Error(`Failed to get AI completion from Groq: ${error.response?.data?.error?.message || error.message}`);
    }
}

module.exports = {
    getGroqCompletion
};