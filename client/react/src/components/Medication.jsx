import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './medication_styles.css';

function Medication() {
  const [email, setEmail] = useState('');
  const [prescription, setPrescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const templateParams = {
      email,
      prescription
    };

    emailjs.send('service_91wus3e', 'template_wi50xzl', templateParams, 'rqQNbrOKjVpnLSD1C')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSuccess('Prescription sent successfully!');
        setEmail('');
        setPrescription('');
        setLoading(false);
      }, (error) => {
        console.log('FAILED...', error);
        setError('Error sending prescription. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="medication-page">
      <div className="medication-container">
        <header className="medication-header">
          <h1>Send Prescription</h1>
          <p>Send medication prescriptions to patients via email</p>
        </header>

        {error && (
          <div className="alert error">
            <span className="alert-icon">⚠️</span>
            <span className="alert-message">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="alert success">
            <span className="alert-icon">✓</span>
            <span className="alert-message">{success}</span>
          </div>
        )}

        <div className="card">
          <form className="prescription-form" onSubmit={handleSend}>
            <div className="form-group">
              <label htmlFor="email">Patient Email</label>
              <input
                type="email"
                id="email"
                placeholder="patient@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="prescription">Prescription Details</label>
              <textarea
                id="prescription"
                placeholder="Enter medication name, dosage, frequency, and special instructions..."
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                rows="6"
                required
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="primary-button"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Prescription'}
              </button>
            </div>
          </form>
        </div>

        <div className="navigation-bar">
          <button 
            onClick={() => navigate(-1)} 
            className="secondary-button"
          >
            Back to Patient List
          </button>
          <Link to="/" className="secondary-button">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Medication;