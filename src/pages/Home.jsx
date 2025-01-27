import React from "react";
import home_page_image from "../images/online-exam-software.jpg";
import Home_dash from "./home.dash";
import "./home.css"

export default function Home() {
  return (
    <>
      <Home_dash />

      <div className="aq">
        <div className="home_left_part">
       
    <div className="home_para_section">
            <h1 className="home_page_image_head">Online
               Education</h1>
          <p className="home_page_image_para">Developed an integrated platform for online exams and educational resources in schools.
             Features include user authentication, timed tests, interactive lessons, quizzes, and progress tracking.
              Utilized React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for data storage. 
              Designed to enhance the learning and assessment experience for students and teachers.</p>
        </div>
        </div>

        
      </div>
    </>
  );
}
