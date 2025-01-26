import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  examId: { type: String, ref: "Exam", required: true },
  obtainedMarks: { type: Number, required: true },
  total_mark: { type: Number, required: true },
  submissionTime: { type: Date, default: Date.now },
});

const Result = mongoose.model("Result", resultSchema);
export default Result;
