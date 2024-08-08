
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="navbar-logo">HealthCare </div>
                <ul className="navbar-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
            <header className="home-header">
                <h1 className="home-title">Welcome to HealthCare Monitoring System</h1>
                <p className="home-description">Your partner in health and recovery.</p>
            </header>
            <div className="home-buttons">
                <Link to="/signup">
                    <button className="home-button">Signup</button>
                </Link>
                <Link to="/login">
                    <button className="home-button">Login</button>
                </Link>
            </div>
            <div className="home-info">
                <p>Our system provides comprehensive monitoring solutions for:</p>
                <ul>
                    <li>Real-time patient data tracking</li>
                    <li>Efficient communication between doctors and patients</li>
                    <li>Personalized health reports and insights</li>
                    <li>Secure and confidential data handling</li>
                </ul>
            </div>
        </div>
    );
}

export default Home;

