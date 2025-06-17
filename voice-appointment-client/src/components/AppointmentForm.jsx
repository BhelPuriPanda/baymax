import React, { useState } from 'react';
import axios from 'axios';

function AppointmentForm({ token }) {
  const [patientName, setPatientName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [preferredDoctor, setPreferredDoctor] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [listening, setListening] = useState(false);

  // Reusable voice input function
  const handleVoice = () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser doesn't support Speech Recognition.");
    return;
  }

  const recognition = new window.webkitSpeechRecognition();
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.start();

  setListening(true);

  recognition.onresult = async (event) => {
    setListening(false);
    const transcript = event.results[0][0].transcript.trim();

    console.log("Received transcript.", transcript);

    try {
      // Send transcript to backend to extract details
      const res = await axios.post('/api/parse', { transcript });
      const parsed = res.data;

      console.log("Parsed.", parsed);

      setPatientName(parsed.patientName);
      setSymptoms(parsed.symptoms);
      setPreferredDoctor(parsed.preferredDoctor);
    } catch (error) {
      console.error(error);
      alert("Failed to extract details.");
    }
  };

  recognition.onerror = (err) => {
    console.error(err);
    setListening(false);
    alert("Voice recognition failed.");
  };
};




  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/appointment/create',
        {
          patientName,
          symptoms,
          preferredDoctor,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConfirmation(res.data.appointment);
      setPatientName('');
      setSymptoms('');
      setPreferredDoctor('');
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
    <div className="flex flex-wrap p-0 m-0 justify-center min-h-screen bg-orange-100">
      <div className="w-full mb-15">
        <p className="text-8xl text-gray-950 mt-5 mb-0  text-center font-semibold baymax-fade-down">
          Receptionist's Dashboard
        </p>
        <p className="text-center text-neutral-800 font-mono text-lg mt-5 baymax-fade-down">
          {/* Give your command as : <b>Patient name</b> <i>patient_name</i>, <b>Symptoms</b> <i>symptoms</i>, <b>Preferred Doctor</b> <i>doctor_name</i> */}
          Give your command as : Patient name patient_name, Symptoms symptom(s), Preferred Doctor doctor_name. 
        </p>
      </div>

      <div className="bg-gray-50 border-1 border-amber-100/50 opacity-10 top-40 p-6 rounded-4xl shadow-gray-400/75 shadow-xl max-w-md w-full absolute mt-20 baymax-fade-up">
        <h2 className="text-3xl text-gray-900 text-center font-semibold mb-3">
          Book Appointment
        </h2> 

        <button
          type="button"
          disabled={listening}
          onClick={handleVoice}
          className="w-full p-2 my-4 bg-gray-900 disabled:bg-gray-400 text-gray-50 font-semibold rounded-md">
          {listening ? " Listening…" : "Fill by Voice"}
        </button>

        <form onSubmit={submit} className="flex flex-col gap-4 mt-3">
          <input
            className="w-full p-2 border rounded-md border-black text-black"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Patient Name"
          />

          <input
            className="w-full p-2 border rounded-md border-black text-black"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Symptoms"
          />

          <input
            className="w-full p-2 border rounded-md border-black text-black"
            value={preferredDoctor}
            onChange={(e) => setPreferredDoctor(e.target.value)}
            placeholder="Doctor Name"
          />

          <button
            disabled={listening}
            type="submit"
            className="w-full p-2 mt-3 bg-gray-900 disabled:bg-gray-400 text-gray-50 font-semibold rounded-md">
            Book Appointment
          </button>
        </form>
      </div>
      {confirmation && (
  <div className="popup">
    <h3 className="text-3xl  text-white text-center font-semibold fade mb-5">Booking Confirmed</h3>
    <p className="text-white text-lg font-light ml-3">Appointment booked for {confirmation.patientName.toUpperCase()} with {confirmation.preferredDoctor.toUpperCase()} for {confirmation.symptoms.toUpperCase()} at {new Date(confirmation.scheduledAt).toLocaleString()}</p>
    <button
      className="bg-red-500 font-semibold text-gray-50 px-4 py-2 rounded-md mt-5 w-full "
      onClick={() => setConfirmation(null)}
    >
      Close
    </button>
  </div>
)}
    </div>
  );
}

export default AppointmentForm;

