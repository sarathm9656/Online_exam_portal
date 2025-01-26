import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Mark_ExamList = () => {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/exams");
        setExams(data);
      } catch (error) {
        console.error("Error fetching exams:", error.message);
        setError("Failed to fetch exams.");
      }
    };

    fetchExams();
  }, []);

  if (error) return <p>{error}</p>;
  if (!exams.length) return <p>No exams available.</p>;

  return (
    <div className="exam-list-container">
      <h2>All Exams</h2>
      <ul>
        {exams.map((exam) => (
          <li key={exam._id} onClick={() => navigate(`/exam-results/${exam._id}`)}>
            {exam.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mark_ExamList;
