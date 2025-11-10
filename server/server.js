const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
// Import routes
const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); 
const eventRoutes = require('./routes/eventRoutes'); 
const llmRoutes = require('./routes/llmRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express app
const app = express();

// Middleware setup
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Route Definitions ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/llm', llmRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Define the port, defaulting to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));