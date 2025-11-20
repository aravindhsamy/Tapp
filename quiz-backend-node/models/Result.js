import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  applicationNumber: { type: String, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  answers: [{ questionIndex: Number, selectedAnswer: String }],
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Result', resultSchema);
