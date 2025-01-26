import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "./all_stud_mark.css";

const ALL_stu_ExamResults = () => {
  const { examId } = useParams(); // Get examId from the URL
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('Fetched examId:', examId); // Log the examId
    const fetchResults = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/exam_results/${examId}`);
        setResults(data);
      } catch (error) {
        console.error("Error fetching results:", error.message);
        setError("Failed to fetch exam results.");
      }
    };
  
    fetchResults();
  }, [examId]);
  

  if (error) return <p>{error}</p>;
  if (!results.length) return <p>No students have attended this exam yet.</p>;

  return (
    <div className="results-container">
      <h2>Exam Results</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Marks Obtained</th>
            <th>Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result._id}>
              <td>{result.userId?._id || "N/A"}</td>
              <td>{result.userId?.name || "N/A"}</td>
              <td>{result.userId?.email || "N/A"}</td>
              <td>{result.obtainedMarks}</td>
              <td>{new Date(result.submissionDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ALL_stu_ExamResults;
