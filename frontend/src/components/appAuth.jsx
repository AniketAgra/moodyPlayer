import React, { useState } from "react";
import axios from "axios";
import "./appAuth.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthForm({ onLoginSuccess }) {
  const [signUpMode, setSignUpMode] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({ username: "", email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/login", loginData);
      toast.success("Login successful");
      onLoginSuccess();
    } catch (err) {
      toast.error("Login failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", signupData);

      await axios.post("/auth/login", {
        username: signupData.username,
        password: signupData.password,
      });

      toast.success("Signup and login successful.");
      onLoginSuccess();
    } catch (err) {
      toast.error("Signup failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className={`container ${signUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handleLogin}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
            </form>

            <form className="sign-up-form" onSubmit={handleSignup}>
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  value={signupData.username}
                  onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
              </div>
              <input type="submit" className="btn" value="Sign up" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here?</h3>
              <p>Click below to create a new account.</p>
              <button className="btn transparent" onClick={() => setSignUpMode(true)}>Sign up</button>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already have an account?</h3>
              <p>Click below to sign in.</p>
              <button className="btn transparent" onClick={() => setSignUpMode(false)}>Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
