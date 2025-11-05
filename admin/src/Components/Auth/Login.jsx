import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import "../../assets/css/Login.css";
import httpClient from "../../Utils/httpClient";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
      e.preventDefault();

      try {
      const response = await httpClient.post("/admin/login", {
        email: username,
        password,
      });

        const data = await response.data;

        // Success: show toaster
        toast.success(data.message);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(response.data.admin));
        setTimeout(() => {
          navigate("/Dashboard"); // change to your home route
        }, 1500);
      } catch (err) {
        console.error("Login error:", err);
        toast.error("Something went wrong");
      }
    };


  const handleCreateAccount = () => {
    console.log("Redirect to create account page");
  };

  return (
    <section className="login-section">
      <div className="login-box rounded">
        <h3 className="text-center mb-4 fw-bold">Sign In</h3>
        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-3 position-relative">
            <FaUser className="input-icon" />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Username / e-mail Id"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className="form-control ps-5"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaEye
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Buttons */}
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-dark">
              Log In
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
