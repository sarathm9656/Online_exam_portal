import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExamSummary = () => {
  const [scored, setScored] = useState(null);
  const [totalMarks, setTotalMarks] = useState(null);
  const [examTitle, setExamTitle] = useState(null);
  const navigate = useNavigate();

  // Load the summary data from localStorage on component load
  useEffect(() => {
    const storedScored = localStorage.getItem("scored");
    const storedTotalMarks = localStorage.getItem("total");
    const storedExamTitle = localStorage.getItem("exam_titil");

    if (storedScored && storedTotalMarks && storedExamTitle) {
      setScored(storedScored);
      setTotalMarks(storedTotalMarks);
      setExamTitle(storedExamTitle);
    } else {
      // Redirect if no summary is available in localStorage
      navigate("/student");
    }
  }, [navigate]);

  // Handle "OK" button click
  const handleOkClick = () => {
    localStorage.removeItem("scored"); // Clear scored from localStorage
    localStorage.removeItem("total"); // Clear total from localStorage
    localStorage.removeItem("exam_titil"); // Clear exam title from localStorage
    navigate("/student"); // Navigate to the dashboard or desired page
  };

  // If no summary is available, display a fallback message
  if (scored === null || totalMarks === null || examTitle === null) return <p>Loading summary...</p>;

  return (
    <div className="summary-container" style={styles.container}>
      <h2 style={styles.heading}>Exam Summary</h2>
      <div style={styles.details}>
        <p style={styles.text}>
          <strong>Exam Title:</strong> {examTitle}
        </p>
        <p style={styles.text}>
          <strong>Scored Marks:</strong> {scored}
        </p>
        <p style={styles.text}>
          <strong>Total Marks:</strong> {totalMarks}
        </p>
      </div>
      <button onClick={handleOkClick} style={styles.button}>
        OK
      </button>
    </div>
  );
};

export default ExamSummary;

// Inline styles for simplicity
const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  details: {
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    margin: "10px 0",
    color: "#555",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};
