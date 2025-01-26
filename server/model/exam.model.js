import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [optionSchema],
  correctAnswer: { type: Number, required: true },
  mark: { type: Number, required: true },
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  questions: [questionSchema],
});

const Exam = mongoose.model('Exam', examSchema);
export default Exam;
