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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-gray-50 p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-4">Login</h2>

        {error && <div className="bg-red-100 p-3 rounded-md text-red-500 mb-4">
          {error}
        </div>}

        <input
          className="w-full p-2 border rounded-md mb-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={loading}
        />

        <input
          className="w-full p-2 border rounded-md mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          disabled={loading}
        />

        <button
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-gray-50 font-semibold rounded-md disabled:bg-gray-400">
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;

