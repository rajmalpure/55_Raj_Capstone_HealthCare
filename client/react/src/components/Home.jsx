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

function Home() {
  return (
    <div className="container">
      <header>
        <h1>Welcome to HealthCare Patient Monitoring System</h1>
      </header>
      <main>
        <section className="hero">
          <h2>Your Health, Our Priority</h2>
          <p>
            We provide personalized care and monitoring to ensure your health
            and well-being.
          </p>
        </section>
        <section className="features">
          <h2>Key Features</h2>
          <ul>
            <li>Patient Registration</li>
            <li>Treatment Details</li>
            <li>Progress Tracking</li>
          </ul>
        </section>
        <section className="call-to-action">
          <p>Sign up now to get started!</p>
          <button>Sign Up</button>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 HealthCare Patient Monitoring System</p>
      </footer>
    </div>
  );
}

export default Home;
