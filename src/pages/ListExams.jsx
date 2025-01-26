import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ListExams.css";

const ExamList = () => {
  const [exams, setExams] = useState([]); // Holds the list of exams
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all exams when the component mounts
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/exams");
        setExams(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching exams:", err.message);
        setError("Failed to load exams.");
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Navigate to the exam page
  const handleExamClick = (examId) => {
    navigate(`/attend-exam/${examId}`);
  };

  if (loading) return <p>Loading exams...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="exam-list-container">
      <h2>Available Exams</h2>
      <ul>
        {exams.map((exam) => (
          <li
            key={exam._id}
            onClick={() => handleExamClick(exam._id)}
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              margin: "10px 0",
              color: "blue",
            }}
          >
            {exam.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamList;
