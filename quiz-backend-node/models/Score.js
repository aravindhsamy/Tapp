// models/Score.js
import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  selectedAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const scoreSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },

  quiz: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Quiz', 
    required: true 
  },

  answers: [answerSchema],   // detailed answers

  score: { type: Number, required: true },   // number of correct answers
  totalQuestions: { type: Number, required: true },
  percentage: { type: Number, required: true },

  status: { 
    type: String, 
    enum: ['passed', 'failed'], 
    default: 'passed' 
  }

}, { timestamps: true });

export default mongoose.model('Score', scoreSchema);
