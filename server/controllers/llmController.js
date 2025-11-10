const asyncHandler = require('express-async-handler');
const { generatePlan } = require('../services/llmService');

// @desc    Generate a study plan or advice using the LLM
// @route   POST /api/llm/generate-plan
// @access  Private (Requires a valid JWT)
const generatePlanController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400);
    throw new Error('Please provide a prompt for the planning assistant.');
  }

  try {
    // 1. Logged-in user is implicitly verified by the 'protect' middleware.
    // 2. Call the service layer to interact with the external LLM API.
    const llmResponse = await generatePlan(prompt);

    // 3. Send the LLM's text response back to the client.
    res.status(200).json({ 
      plan: llmResponse,
      // You can optionally return the user's ID to confirm context
      userId: req.user.id 
    });
  } catch (error) {
    console.error(`LLM Request failed for user ${req.user.id}:`, error.message);
    res.status(500).json({ 
      message: 'Failed to generate plan. Please try again later.', 
      details: error.message 
    });
  }
});

module.exports = { generatePlanController };