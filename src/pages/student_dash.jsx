import React from "react";
import "./student_dash.css"

export default function Home_Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">Easy-win</div>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Question Bank</a></li>
            <li><a href="/view_exam">Exam </a></li>
            <li><a href="#">Result</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          {/* <button className="premium-button">Buy Premium</button> */}
          <p>Learn more</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Exam Status Section */}
        <section className="exam-status">
          <h2>Exam Status</h2>
          <div className="exam-cards">
            <div className="exam-card completed">
              <img src="placeholder.jpg" alt="Business Transformation" />
              <div className="card-content">
                <h3>Business Transformation</h3>
                <p>By Prof. Kenni</p>
                <p>8:30 PM, 13th March 2019</p>
                <span className="status">Completed</span>
              </div>
            </div>
            <div className="exam-card in-progress">
              <img src="placeholder.jpg" alt="Design Principles" />
              <div className="card-content">
                <h3>Design Principles</h3>
                <p>By Prof. Steven Joe</p>
                <p>3 days ago</p>
                <span className="status">65% Done</span>
              </div>
            </div>
            <div className="exam-card not-started">
              <img src="placeholder.jpg" alt="Software Engineering" />
              <div className="card-content">
                <h3>Software Engineering</h3>
                <p>By Prof. Stuart</p>
                <p>2 days ago</p>
                <span className="status">Not Started</span>
              </div>
            </div>
          </div>
        </section>

        {/* Exam Paper Manager Section */}
        <section className="exam-paper-manager">
          <h2>Exam Paper Manager</h2>
          <div className="tabs">
            <button className="tab active">Pending</button>
            <button className="tab">Reviewed</button>
            <button className="tab">Published</button>
          </div>
          <div className="exam-list">
            <div className="exam-item">
              <h3>Software Process II</h3>
              <p>Final assessment | Created on 14th March 2019</p>
              <button className="resume-button">Resume</button>
            </div>
            <div className="exam-item">
              <h3>Project Management Mid Term I</h3>
              <p>Mid term exam | Created on 10th April 2019</p>
              <button className="start-button">Start</button>
            </div>
          </div>
        </section>

        {/* Ongoing Sessions Section */}
        <section className="ongoing-sessions">
          <h2>Ongoing Sessions</h2>
          <div className="session-item">
            <h3>Scaling Agile Technical Practices</h3>
            <p>By Prof. Lee Dan Qi</p>
            <button className="join-button">Join</button>
          </div>
          <ul className="session-details">
            <li>Project Management Basics - 03:40 min - Medium</li>
            <li>Object Oriented Advanced - 06:08 min - Hard</li>
            <li>Basics of Agile II - 09:30 min - Medium</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
