import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./login-page.css";

export default function Login() {
  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
  
    let username = e.target.username.value;
    let password = e.target.password.value;
  
    const login = async (username, password) => {
      try {
        const response = await fetch("http://localhost:5000/api/login/student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || "Login failed");
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw error.message || "An unexpected error occurred";
      }
    };
  
    try {
      const response = await login(username, password);
      console.log("API Full Response:", response);
  
      localStorage.setItem("token ", response.token);
      localStorage.setItem("userid",username)
      const userId = response.data.userId;
      localStorage.setItem("userId", userId); // Save userId
      toast.success("Login successful");
  
      const role = response?.role || "unknown"; // Handle missing role
      console.log("User role:", role);
  
      switch (role.toLowerCase()) {
        case "student":
          navigate("/student");
          break;
        case "trainer":
          navigate("/trainer");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/404"); // Fallback route
          break;
      }
    } catch (error) {
      toast.error(error || "Failed to log in");
    }
  };
  
  
  

  return (
    <div className="login_page">
   
    
      <form onSubmit={submitHandler}>
        <div className="login_main">
          <div className="login_head">
            <h1>Login</h1>
          </div>
          <div className="username_section">
            <input
              type="text"
              name="username"
              id="user_name"
              placeholder="User name"
              required
            />
          </div>
          <div className="pass_section">
            <input
              type="password"
              name="password"
              id="user_pass"
              placeholder="Password"
              required
            />
          </div>
          <div className="log_butt_div">
            <input type="submit" value="Login" className="log_butt" />
          </div>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
