// src/App.jsx
import React, { useState } from "react";
import AppointmentForm from "./components/AppointmentForm";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="min-h-screen">
      {!token ? (
        <Login onLogin={(newToken) => setToken(newToken)} />
      ) : (
        <AppointmentForm token={token} />
      )}

    </div>
  );
}

export default App;

