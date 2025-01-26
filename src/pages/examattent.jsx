import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ExamAttend = ({ userId }) => {
  const { examId } = useParams(); // Extract examId from the URL
  const [exam, setExam] = useState(null); // Holds exam details
  const [responses, setResponses] = useState({}); // Tracks user answers
  const [message, setMessage] = useState("");

  // Fetch the exam details when the component loads
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/exam/${examId}`);
        setExam(data);
       
      } catch (error) {
        console.error("Error fetching exam:", error.message);
        setMessage("Failed to load exam details.");
      }
    };

    fetchExam();
  }, [examId]);

  // Handle answer change for a question
  const handleAnswerChange = (qIndex, value) => {
    setResponses({ ...responses, [qIndex]: Number(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all questions are answered
    if (Object.keys(responses).length !== exam.questions.length) {
      setMessage("Please answer all questions before submitting.");
      return;
    }
  
    let obtainedMarks = 0;
    exam.questions.forEach((q, index) => {
      if (responses[index] === q.correctAnswer) {
        obtainedMarks += q.mark;
      }
    });
    const userId = localStorage.getItem("userid");
    
  const total_mark =exam.totalMarks
    const payload = {
      userId,
      examId,
      obtainedMarks,
      total_mark,
    };
  
    console.log("Submitting payload:", payload);
  
    try {
      const { data } = await axios.post("http://localhost:5000/api/submit_exam", payload);
      setMessage(data.message || "Exam submitted successfully!");
    } catch (error) {
      console.error("Error submitting exam:", error.response?.data || error.message);
      setMessage("Failed to submit exam.");
    }
  };
  

  // Render loading state if the exam data is not yet loaded
  if (!exam) return <p>Loading exam details...</p>;

  return (
    <div className="exam-container">
      <h2>{exam.title}</h2>
      <p>Duration: {exam.duration} minutes</p>
      <p>Total Marks: {exam.totalMarks}</p>

      <form onSubmit={handleSubmit}>
        {exam.questions.map((q, qIndex) => (
          <div key={qIndex} className="question-container">
            <h4>Question {qIndex + 1}</h4>
            <p>{q.questionText}</p>
            {q.options.map((option, oIndex) => (
              <div key={oIndex}>
                <input
                  type="radio"
                  id={`q${qIndex}_o${oIndex}`}
                  name={`q${qIndex}`}
                  value={oIndex}
                  onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                  required
                />
                <label htmlFor={`q${qIndex}_o${oIndex}`}>{option.text}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-button">
          Submit Exam
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ExamAttend;
