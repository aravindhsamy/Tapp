// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import quizRoutes from './routes/quiz.js';
import studentRoutes from './routes/student.js';
import scoreRoutes from './routes/score.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // must be before routes

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Root route
app.get('/', (req, res) => res.send('Quiz API running'));

// Test route for Postman
app.post('/test', (req, res) => {
  console.log('POST /test body:', req.body);
  res.json({ received: req.body });
});

// API routes
app.use('/api/quizzes', quizRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/scores', scoreRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
