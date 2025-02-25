import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api"; // Import Axios instance

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // try {
    //   const { data } = await API.post("/api/auth/login", { email, password }); // Manually add `/api`
    //   localStorage.setItem("token", data.token);
    //   localStorage.setItem("user", JSON.stringify(data.user));

    //   navigate("/dashboard");
    // } catch (err) {
    //   setError(err.response?.data?.message || "Login failed");
    // }

    try {
      console.log(
        "Sending request to:",
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`
      );

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      console.log("Response Status:", response.status); // ✅ Debugging response status

      const data = await response.json();

      console.log("Server Response:", data); // ✅ Debugging response

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login succesfull");
      navigate("/");
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-[#387478] rounded-lg hover:bg-[#629584]"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#243642] underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
