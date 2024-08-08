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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setError(error.message);
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
    <div className="home-content">
      <div className="nav">
        <div className='form'>
          {isLoggedIn ? (
            <button className='login' onClick={() => {
              sessionStorage.removeItem('login');
              setIsLoggedIn(false);
              navigate("/Login");
            }}>Logout</button>
          ) : (
            <>
              <Link to="/Login">
                <button className='login'>Login</button>
              </Link>
              <Link to="/Signup">
                <button className='signup'>Signup</button>
              </Link>
            </>
          )}
        </div>
        {error && <p className="error-message">{error}</p>}

        {isLoggedIn && (
          <div className="filter">
            <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="container">
        {filteredEntries.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          filteredEntries.map((patientSchema) => (
            <div key={patientSchema._id} className="card">

              <div className="info">
                <ul>
                  <li>Name: {patientSchema.Name}</li>
                  <li>Email: {patientSchema.Email}</li>
                  <li>Medical history: {patientSchema.Medical_history}</li>
                  <li>Treatment details: {patientSchema.Treatment_details}</li>
                </ul>
                <div className="btns">
                  <Link to={`/patients/${patientSchema._id}`}>
                    <button className="update">Update</button>
                  </Link>
                  <button className="delete" onClick={() => deleteItem(patientSchema._id)}>Delete</button>
                  <Link to={`/medication`}>
                    <button className="medication">Medication</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Patientlist;
