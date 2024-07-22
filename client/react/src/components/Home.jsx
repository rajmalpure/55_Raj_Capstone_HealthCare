
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to HealthCare Monitoring System</h1>
            <p>Are you a doctor or a patient?</p>
            <Link to="/logindoctor"><button>Doctor</button></Link>
            <Link to="/loginpatient"><button>Patient</button></Link>
        </div>
    );
  }


export default Home;

