const { GoogleGenAI } = require('@google/genai');

// Initialize the GoogleGenAI instance with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Generates a study plan or advice based on a detailed user prompt.
 * @param {string} promptText - The user's request (e.g., "Create a 3-week plan for Calculus").
 * @returns {string} The LLM-generated text response.
 */
const generatePlan = async (promptText) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables.');
  }

  // Define a system instruction to set the context for the model
  const systemInstruction = `You are a helpful and professional academic planning assistant 
    for students preparing for exams. Your responses should be structured, encouraging, 
    and directly address the user's study goal. Format the output clearly using markdown.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // A fast, capable model for planning tasks
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // A bit of creativity for varied planning
      },
    });

    // Extract the text response
    return response.text;

  } catch (error) {
    console.error('LLM Service Error:', error);
    throw new Error('Failed to communicate with the planning assistant API.');
  }
};

module.exports = { generatePlan };