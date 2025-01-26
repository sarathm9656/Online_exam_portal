import React, { useState } from "react";
import axios from "axios";
import "./create_exam.css"; // Import the CSS file

const CreateExam = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: 0, mark: "" },
  ]);
  const [message, setMessage] = useState("");

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", ""], correctAnswer: 0, mark: "" },
    ]);
  };

  const handleChangeQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "questionText") updatedQuestions[index].questionText = value;
    if (field === "mark") updatedQuestions[index].mark = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleChangeOption = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleChangeCorrectAnswer = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = Number(value);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Transform options to match the backend schema
    const formattedQuestions = questions.map((q) => ({
      questionText: q.questionText,
      options: q.options.map((opt) => ({ text: opt })), // Convert strings to objects
      correctAnswer: q.correctAnswer,
      mark: q.mark,
    }));
  
    const payload = {
      title,
      duration,
      totalMarks,
      questions: formattedQuestions,
    };
  
    try {
      console.log("Request Payload:", payload); // Log the formatted payload
      const response = await axios.post("http://localhost:5000/api/create_exam", payload);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message); // Log the error
      setMessage("Failed to create exam: " + error.message);
    }
  };
  
  
  return (
    <div className="exam-container">
      <h2>Create Exam</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Duration (in minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <label>Total Marks:</label>
        <input
          type="number"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
          required
        />

        <h3>Questions:</h3>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-container">
            <h4>Question {qIndex + 1}</h4>
            <label>Question Text:</label>
            <input
              type="text"
              value={q.questionText}
              onChange={(e) =>
                handleChangeQuestion(qIndex, "questionText", e.target.value)
              }
              required
            />
            <label>Options:</label>
            {q.options.map((option, oIndex) => (
              <div key={oIndex} className="option-container">
                <label>Option {oIndex + 1}</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleChangeOption(qIndex, oIndex, e.target.value)}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddOption(qIndex)}
              className="add-option-button"
            >
              Add Option
            </button>
            <label>Correct Answer:</label>
            <select
              value={q.correctAnswer}
              onChange={(e) => handleChangeCorrectAnswer(qIndex, e.target.value)}
            >
              {q.options.map((_, oIndex) => (
                <option key={oIndex} value={oIndex}>
                  Option {oIndex + 1}
                </option>
              ))}
            </select>
            <label>Mark for this Question:</label>
            <input
              type="number"
              value={q.mark}
              onChange={(e) => handleChangeQuestion(qIndex, "mark", e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion} className="add-question-button">
          Add Question
        </button>

        <button type="submit" className="submit-button">
          Create Exam
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateExam;
