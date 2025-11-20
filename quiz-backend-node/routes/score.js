import express from 'express';
import Score from '../models/Score.js';
import Quiz from '../models/Quiz.js';

const router = express.Router();

// Submit quiz and save score
router.post('/submit', async (req, res) => {
  const { studentId, quizId, answers } = req.body;

  try {
    // Fetch the quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    // Calculate score
    let correctCount = 0;
    const detailedAnswers = quiz.questions.map(q => {
      const userAnswer = answers.find(a => a.questionId === q._id.toString());
      const isCorrect = userAnswer?.selectedAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionId: q._id,
        selectedAnswer: userAnswer?.selectedAnswer || null,
        isCorrect
      };
    });

    const totalQuestions = quiz.questions.length;
    const percentage = (correctCount / totalQuestions) * 100;

    // Save score
    const score = new Score({
      student: studentId,
      quiz: quizId,
      answers: detailedAnswers,
      score: correctCount,
      totalQuestions,
      percentage,
      status: percentage >= 50 ? 'passed' : 'failed'
    });

    const savedScore = await score.save();
    res.json(savedScore);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all scores
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find().populate('student').populate('quiz');
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single score by ID
router.get('/:id', async (req, res) => {
  try {
    const score = await Score.findById(req.params.id).populate('student').populate('quiz');
    if (!score) return res.status(404).json({ message: 'Score not found' });
    res.json(score);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
