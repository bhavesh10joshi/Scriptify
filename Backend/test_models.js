const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testModel(modelName) {
    try {
        console.log(`Testing model: ${modelName}`);
        const response = await ai.models.generateContent({
            model: modelName,
            contents: 'Hello'
        });
        console.log(`Success with ${modelName}:`, response.text);
    } catch (error) {
        console.log(`Failed with ${modelName}:`, error.message);
    }
}

async function run() {
    await testModel('gemini-2.5-flash');
    await testModel('gemini-2.5-flash-lite');
    await testModel('gemini-3.5-flash');
    await testModel('gemini-3.5-flash-lite');
    await testModel('gemini-3.6-flash');
}

run();
