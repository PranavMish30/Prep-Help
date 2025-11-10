import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'http://localhost:5000/api/llm/generate-plan';

const LLMPlanner = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    return user && user.token ? {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    } : {};
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPlan('');
    setLoading(true);

    if (!prompt.trim()) {
      setError("Please enter a study planning request.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(API_URL, { prompt }, getAuthHeaders());
      setPlan(response.data.plan);
    } catch (err) {
      console.error('LLM Request failed:', err);
      const message = err.response?.data?.message || "Could not connect to the planning assistant. Check your server.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="llm-planner-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🧠 AI Study Planner</h1>
      <p>Ask for a study schedule, get help breaking down a subject, or find tips for your next exam!</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Create a detailed 4-day study plan for my Biology exam next week, focusing on cellular respiration and photosynthesis."
          rows="5"
          style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc' }}
          required
        />
        <button 
          type="submit" 
          disabled={loading} 
          style={{ padding: '10px 20px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Generating Plan...' : 'Generate Study Plan'}
        </button>
      </form>

      {error && <div style={{ color: 'red', marginBottom: '15px' }}>Error: {error}</div>}

      {plan && (
        <div className="plan-output">
          <h2>📝 Your Custom Study Plan</h2>
          {/* We use dangerouslySetInnerHTML to render the markdown/HTML structure 
              returned by the LLM. In a real app, use a dedicated markdown renderer 
              like 'react-markdown' for safety and styling. */}
          <div 
            style={{ 
              backgroundColor: '#f9f9f9', 
              padding: '20px', 
              border: '1px solid #eee', 
              whiteSpace: 'pre-wrap', 
              textAlign: 'left'
            }}
            dangerouslySetInnerHTML={{ __html: plan.replace(/\n/g, '<br/>') }}
          />
        </div>
      )}
    </div>
  );
};

export default LLMPlanner;