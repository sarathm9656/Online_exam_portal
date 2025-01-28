import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";  // Import the menu icon from react-icons
import examport_logo from "../images/easy-win-logo-removebg-preview.png";
import "../css/home_dash.css";

export default function Home_dash() {
  const renavigate = useNavigate();
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    
      <div className="dash_main">
        <div className="first_section">
          <div className="home_dash_logo_section">
            <img src={examport_logo} alt="examport logo" className="home_dash_logo" />
            <h3 className="exam_portal_name">Online Exam Portal</h3>

          </div>
          <div className="items">
          </div>
        </div>

        <div className="home_dash_about">
          <Link to="/about"></Link>
        </div>

        <div className="menu_icon" onClick={handleMenuToggle}>
          <FaBars />
        </div>

        <div className={`iteams ${showMenu ? "show" : ""}`} style={{ position: "relative" }}>
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

        <div className={`iteams ${showMenu ? "show" : ""}`}>
          <button className="home_dash_reg_butt" onClick={handleNavigate}>
            Login
          </button>
        </div>
      </div>
  )};