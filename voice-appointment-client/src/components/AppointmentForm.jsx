import React, { useState } from 'react';
import axios from 'axios';

function AppointmentForm({ token }) {
  const [patientName, setPatientName] = useState('');
  const [symptom, setSymptom] = useState('');
  const [doctor, setDoctor] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  // Reusable voice input function
  const handleVoice = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert('Speech recognition not supported');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (e) => {
    const text = e.results[0][0].transcript.trim().toLowerCase();

    // Split or extract info
    // This assumes format: "patient [name], symptoms [symptom], preferred doctor [doctor]"
    const patientMatch = text.match(/patient ([\w ]+)/);
    const symptomsMatch = text.match(/symptom(s)? ([\w ]+)/);
    const doctorMatch = text.match(/doctor ([\w ]+)/);

    if (patientMatch) setPatientName(patientMatch[1]?.trim()); 
    if (symptomsMatch) setSymptom(symptomsMatch[2]?.trim()); 
    if (doctorMatch) setDoctor(doctorMatch[1]?.trim()); 
  };
};


 const submit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('/api/appointment/create', 
      { patientName, symptoms: symptom, preferredDoctor: doctor },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setConfirmation(res.data.appointment);
    alert('Appointment booked successfully');
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.error) {
      alert(`Failed to book: ${error.response.data.error}`);
    } else {
      alert('Failed to book due to an unknown error');
    }
  }
};



  return (
    <div className="max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>

      <button
      type="button"
      onClick={handleVoice}
      className="bg-blue-500 text-gray-50 px-3 py-2 rounded-md mb-4">
      Fill by Voice
      </button>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <label className="block font-semibold">Patient Name</label>
          <div className="flex gap-2">
            <input
              className="flex-grow p-2 border rounded-md"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Patient Name"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Symptoms</label>
          <div className="flex gap-2">
            <input
              className="flex-grow p-2 border rounded-md"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              placeholder="Symptoms"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Doctor</label>
          <div className="flex gap-2">
            <input
              className="flex-grow p-2 border rounded-md"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              placeholder="Doctor Name"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-gray-50 px-4 py-2 rounded-md font-semibold">
          Book Appointment
        </button>
      </form>

      {confirmation && (
        <div className="bg-green-100 p-4 mt-4 rounded-md">
          <h3 className="text-lg font-semibold">Booking Confirmed</h3>
          <p>Patient: {confirmation.patientName}</p>
          <p>Symptoms: {confirmation.symptoms}</p>
          <p>Doctor: {confirmation.preferredDoctor}</p>
          <p>Date: {new Date(confirmation.scheduledAt).toLocaleString()}</p>
        </div>
      )}

    </div>
  );
}

export default AppointmentForm;

