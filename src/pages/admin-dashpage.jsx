import React from "react";
import "./teacherDashPage.css";

const DashboardPage = () => {
  const cards = [
    { color: "blue", title: "users", value: 6 },
    { color: "green", title: "Exams", value: 3 },
    { color: "yellow", title: "classes", value: 8 },
    // { color: "red", title: "Super Administrator", value: 1 },
  ];
  const remove = ()=>{
    localStorage.removeItem("authToken");
  }
  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>CBT</h2>
        <ul>
          <li><a href="">Dashboard</a></li>
          <li><a href="/users">Users</a></li>
          <li><a href="/classes">Classes</a></li>
          <li><a href="/tests">Tests</a></li>
          <li><a href="/results">Results</a></li>
          <li><a href="/logout " onClick={remove}>Log out</a></li>
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
