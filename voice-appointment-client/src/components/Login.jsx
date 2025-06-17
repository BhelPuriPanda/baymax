// src/components/Login.jsx
import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.error ||
        "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap p-3 m-0 justify-center min-h-screen bg-linear-to-b from-green-400 to-green-800">
      <div className="w-full h-0 mb-25">
        <h1 className="text-9xl text-amber-50 text-center font-semibold my-8 baymax-fade-down">BAYMAX</h1>
        <h1 className="text-5xl text-center font-medium my-2 baymax-fade-down">Manages your Patients' Appointments Better&Faster</h1>
        <h1 className="text-center font-light text-lg my-2 baymax-fade-down">By Team Error404</h1>
      </div>
      <div>
      <form
        onSubmit={handleLogin}
        className="bg-gray-50 p-6 mt-30 rounded-2xl shadow-md w-full max-w-md baymax-fade">
        <h2 className="text-3xl text-center font-semibold mb-6 baymax-fade-up">Receptionist Login</h2>

        {error && <div className="bg-red-100 p-3 rounded-md text-red-500 mb-4">
          {error}
        </div>}

        <input
          className="w-full p-2 border rounded-md mb-4 baymax-fade-up"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={loading}
        />

        <input
          className="w-full p-2 border rounded-md mb-4 baymax-fade-up"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          disabled={loading}
        />

        <button
          disabled={loading}
          className="w-full p-2 mt-5 bg-green-600 text-gray-50 font-semibold rounded-md disabled:bg-gray-400 baymax-fade-up">
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
      </div>
    </div>
  );
}

export default Login;

