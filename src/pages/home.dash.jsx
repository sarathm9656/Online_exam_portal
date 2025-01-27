import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import examport_logo from "../images/easy-win-logo-removebg-preview.png";
import "../css/home_dash.css";

export default function Home_dash() {
  const renavigate = useNavigate();
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  const toggleRegisterMenu = () => {
    setShowRegisterMenu((prev) => !prev);
    setShowLoginMenu(false); 
  };

  const toggleLoginMenu = () => {
    setShowLoginMenu((prev) => !prev);
    setShowRegisterMenu(false); 
  };

  const handleMenuClick = (type, role) => {
    renavigate(`/${type}/${role}`);
  };

    const navigate = useNavigate();
  
    const handleNavigate = () => {
      navigate("/login");
    };
  return (
    <>
      <div className="dash_main">
        <div className="frist_section">
          <div className="home_dash_logo">
            <img src={examport_logo} alt="examport logo" className="home_dash_logo" />
          </div>
          <div className="iteams">
            <h3>Online Exam Portal</h3>
          </div>
        </div>

        <div className="home_dash_about">
          <Link to="/about">ABOUT</Link>
        </div>

        <div className="iteams" style={{ position: "relative" }}>
          <button className="home_dash_reg_butt" onClick={toggleRegisterMenu}>
            Register
          </button>
          {showRegisterMenu && (
            <div className="dropdown-menu">
              <button onClick={() => handleMenuClick("register", "student_reg")}>Student</button>
              <button onClick={() => handleMenuClick("register", "teacher_reg")}>Teacher</button>
              <button onClick={() => handleMenuClick("register", "admin_reg")}>Admin</button>
            </div>
          )}
        </div>

        <div className="iteams" >
          <button className="home_dash_reg_butt" onClick={ handleNavigate }>
            Login
          </button>

          {/* {showLoginMenu && (
            <div className="dropdown-menu">
              <button onClick={() => handleMenuClick("login", "student_login")}>Student</button>
              <button onClick={() => handleMenuClick("login", "teacher_login")}>Teacher</button>
              <button onClick={() => handleMenuClick("login", "admin_login")}>Admin</button>
            </div>
          )} */}
        </div>
      </div>

      
      <style>
        {`
          .dropdown-menu {
            position: absolute;
            top: 50px;
            left: 0;
            background: #f1f1f1;
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
            z-index: 1000;
          }
          .dropdown-menu button {
            display: block;
            width: 100%;
            margin-bottom: 5px;
            background: #007bff;
            color: white;
            border: none;
            padding: 8px;
            border-radius: 3px;
            cursor: pointer;
          }
          .dropdown-menu button:hover {
            background: #0056b3;
          }
          .home_dash_reg_butt, .home_dash_log_butt {
            margin-top: 10px;
          }
        `}
      </style>
    </>
  );
}
