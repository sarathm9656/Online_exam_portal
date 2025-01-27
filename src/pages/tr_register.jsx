import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "./register.css";

export default function Register() {
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const { username, email, password } = e.target.elements;

        try {
            // Send POST request to the backend
            const response = await axios.post("http://localhost:5000/api/register/trainer", {
                username: username.value,
                email: email.value,
                password: password.value,
            });

            // Handle successful registration
            if (response.status === 201) {
                toast.success("Registration successful");
                navigate("/login"); // Redirect to login page
            }
        } catch (error) {
            // Handle errors
            if (error.response && error.response.data.msg) {
                toast.error(error.response.data.msg); // Show server error message
            } else {
                toast.error("Registration failed. Please try again."); // Show generic error message
            }
        }
    };

    return (
        <div className="reg_page">
            <form onSubmit={submitHandler}>
                <div className="form_section">
                    <h2 className="register_role">Trainer</h2>
                    <h2 className="regi_head">Register</h2>
                    <input type="text" name="username" placeholder="User Name" required />
                    <input type="email" name="email" placeholder="Email" required />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="reg_pass"
                        required
                    />
                    <input type="submit" className="reg_submit" value="Register" />
                    <p>
                        Have an account? <Link to="/login/trainer">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
