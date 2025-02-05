import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './signup_styles.css';

function Medication() {
  const [email, setEmail] = useState('');
  const [prescription, setPrescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();

    const templateParams = {
      email,
      prescription
    };

    emailjs.send('service_91wus3e', 'template_wi50xzl', templateParams, 'rqQNbrOKjVpnLSD1C')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSuccess('Email sent successfully!');
        setEmail('');
        setPrescription('');
      }, (error) => {
        console.log('FAILED...', error);
        setError('Error sending email. Please try again.');
      });
  };

  return (
    <div className="medication-content">
      <h1>Send Prescription</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="send-form" onSubmit={handleSend}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prescription">Prescription:</label>
          <textarea
            id="prescription"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="send-button">Send</button>
      </form>
      <div className="navigation-buttons">
        <button onClick={() => navigate(-1)}>Go Back</button>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default Medication;
