// src/components/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200 text-gray-800">
      <h1 className="text-6xl font-bold mb-8">Welcome to Baymax</h1>
      <p className="text-lg mb-4 max-w-xl text-center">
        Baymax is your smart clinic assistant for quick and efficient appointment bookings.
        Built with voice technology to simplify the reception workflow.
      </p>

      <div className="my-6 flex flex-col items-center gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
        <a href="#services" className="text-blue-600 underline">Learn more</a>
      </div>

      <section id="services" className="mt-12 text-center max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p>✔ Voice-based Appointment Booking<br/>✔ Real-time Doctor Dashboard<br/>✔ AI-powered Prescription Generator</p>

        <h2 className="text-3xl font-bold mt-10 mb-4">Our Team</h2>
        <p>🧠 Built by passionate developers to ease clinic operations</p>

        <h2 className="text-3xl font-bold mt-10 mb-4">FAQs</h2>
        <p><strong>Q:</strong> Is voice booking secure?<br/><strong>A:</strong> Yes, all data is handled securely on our servers.</p>
      </section>
    </div>
  );
}

export default HomePage;
