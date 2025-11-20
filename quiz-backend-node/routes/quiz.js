import express from 'express';
import Quiz from '../models/Quiz.js';

const router = express.Router();

/* -----------------------------------------
   GET all quizzes
------------------------------------------ */
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* -----------------------------------------
   GET quiz by ID
------------------------------------------ */
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* -----------------------------------------
   CREATE a quiz
------------------------------------------ */
router.post('/', async (req, res) => {
  const quiz = new Quiz(req.body);
  try {
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* -----------------------------------------
   UPDATE a quiz (PUT)
------------------------------------------ */
router.put('/:id', async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated item
    );

    if (!updatedQuiz)
      return res.status(404).json({ message: 'Quiz not found' });

    res.json(updatedQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* -----------------------------------------
   DELETE a quiz
------------------------------------------ */
router.delete('/:id', async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!deletedQuiz)
      return res.status(404).json({ message: 'Quiz not found' });

    res.json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
