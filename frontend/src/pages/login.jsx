import React, { useState } from "react";
import "./CSS/Signup.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? "/signup" : "/login";
    try {
      const response = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage(isSignup ? "Signup Successful! Please log in." : "Login Successful!");

        if (!isSignup) {
          localStorage.setItem("auth-token", data.token); // Store token after login
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        }
      } else {
        setMessage(data.errors);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isSignup && (
          <label className="terms">
            <input type="checkbox" required /> By continuing, I agree to the terms of use & privacy policy.
          </label>
        )}
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login here" : " Sign up"}
          </span>
        </p>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
