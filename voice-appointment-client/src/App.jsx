// // src/App.jsx
// import React, { useState } from "react";
// import AppointmentForm from "./components/AppointmentForm";
// import Login from "./components/Login";

// function App() {
//   const [token, setToken] = useState(null);

//   return (
//     <div className="min-h-screen">
//       {!token ? (
//         <Login onLogin={(newToken) => setToken(newToken)} />
//       ) : (
//         <AppointmentForm token={token} />
//       )}

//     </div>
//   );
// }

// export default App;

// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentForm from "./components/AppointmentForm";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            !token ? (
              <Login onLogin={(newToken) => setToken(newToken)} />
            ) : (
              <AppointmentForm token={token} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
