import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './Patientlist.css';

function Patientlist() {
  const [patientdata, setPatientdata] = useState([]);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState("All");
  const [uniqueUsers, setUniqueUsers] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching patient data...");
        const response = await axios.get(`https://five5-raj-capstone-healthcare-4.onrender.com/patient`);
        console.log("Patient data response:", response);

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = response.data;
        setPatientdata(data);

        const users = ["All", ...new Set(data.map(item => item.created_by).filter(Boolean))];
        setUniqueUsers(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Check login status
    const loginStatus = sessionStorage.getItem('login');
    setIsLoggedIn(!!loginStatus);
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`https://five5-raj-capstone-healthcare-4.onrender.com/patient/${id}`);
      setPatientdata(prevState => prevState.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
      setError("Error deleting data. Please try again.");
    }
  };

  const filteredEntries = patientdata.filter(item => selectedUser === "All" || item.created_by === selectedUser);

  return (
    <div className="patient-page">
      <header className="page-header">
        <h1>Patient Management System</h1>
        <div className="auth-section">
          {isLoggedIn ? (
            <button className="btn logout-btn" onClick={() => {
              sessionStorage.removeItem('login');
              setIsLoggedIn(false);
              navigate("/Login");
            }}>Logout</button>
          ) : (
            <>
              <Link to="/Login">
                <button className="btn login-btn">Login</button>
              </Link>
              <Link to="/Signup">
                <button className="btn signup-btn">Signup</button>
              </Link>
            </>
          )}
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}
      
      <div className="control-bar">
        {isLoggedIn && (
          <div className="filter-section">
            <label htmlFor="user-filter">Filter by Provider:</label>
            <select 
              id="user-filter" 
              value={selectedUser} 
              onChange={e => setSelectedUser(e.target.value)}
            >
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user || "Unassigned"}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading">Loading patient data...</div>
      ) : (
        <div className="patient-grid">
          {filteredEntries.length === 0 ? (
            <div className="no-data-message">No patients found.</div>
          ) : (
            filteredEntries.map((patientSchema) => (
              <div key={patientSchema._id} className="patient-card">
                <div className="patient-card-header">
                  <h3>{patientSchema.Name}</h3>
                </div>

                <div className="patient-details">
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{patientSchema.Email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Medical History:</span>
                    <span className="detail-value">{patientSchema.Medical_history}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Treatment Details:</span>
                    <span className="detail-value">{patientSchema.Treatment_details}</span>
                  </div>
                </div>
                
                <div className="patient-actions">
                  <Link to={`/patients/${patientSchema._id}`}>
                    <button className="btn update-btn">Update</button>
                  </Link>
                  <button className="btn delete-btn" onClick={() => deleteItem(patientSchema._id)}>Delete</button>
                  <Link to={`/medication`}>
                    <button className="btn medication-btn">Medication</button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Patientlist;