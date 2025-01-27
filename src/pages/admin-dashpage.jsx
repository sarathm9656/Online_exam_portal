import React from "react";
import "./teacherDashPage.css";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const cards = [
    { color: "blue", title: "users", value: 6 },
    { color: "green", title: "Exams", value: 3 },
    { color: "yellow", title: "classes", value: 8 },
    // { color: "red", title: "Super Administrator", value: 1 },
  ];
  const navigate = useNavigate();
  const removetoken =()=>{
    localStorage.removeItem("token")
    const tok=localStorage.getItem("token")


    if(!tok){
      navigate("/")
    }
  }
  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>CBT</h2>
        <ul>
          <li><a href="/AddExam">Create Exam</a></li>
          <li><a href="/exams_mark">Result</a></li>
          <li><a href="/classes">users</a></li>
          <li><a href="">Tests</a></li>
          <li><a href="/results">overview</a></li>
          <li><a href="" onClick={removetoken}>Log out</a></li>
        </ul>
      </div>

      {/* Content */}
      <div className="content">
        <h1>Dashboard</h1>
        <div className="cards">
          {cards.map((card, index) => (
            <div key={index} className={`card ${card.color}`}>
              <h2>{card.value}</h2>
              <p>{card.title}</p>
              <button>More info</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
