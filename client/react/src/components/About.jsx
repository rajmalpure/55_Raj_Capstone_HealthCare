import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>Healthcare Monitoring System</h1>
        <p className="tagline">Transforming Patient Treatment Tracking</p>
      </div>
      
      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          The Healthcare Monitoring System is an innovative digital solution designed to provide 
          comprehensive visibility into patient treatment details. Currently in the conceptual stage, 
          our system aims to revolutionize how healthcare providers track, manage, and analyze 
          patient care information.
        </p>
        <p>
          We believe that accessible, organized treatment data leads to better patient outcomes. 
          Our Healthcare Monitoring System will serve as a centralized platform where healthcare 
          professionals can easily access and monitor treatment plans, medication schedules, 
          progress notes, and outcome measurements—all in one intuitive interface.
        </p>
      </section>
      
      <section className="about-section features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon tracking-icon"></div>
            <h3>Comprehensive Treatment Tracking</h3>
            <p>Monitor all aspects of patient care from initial diagnosis through ongoing treatment</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon realtime-icon"></div>
            <h3>Real-time Updates</h3>
            <p>Access the most current treatment information when it matters most</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon interface-icon"></div>
            <h3>User-friendly Interface</h3>
            <p>Designed with healthcare professionals in mind for maximum efficiency</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon security-icon"></div>
            <h3>Secure Data Management</h3>
            <p>Built with patient privacy and data security as top priorities</p>
          </div>
        </div>
      </section>
      
      <section className="about-section">
        <h2>Why We're Different</h2>
        <p>
          Unlike traditional healthcare management systems that focus primarily on administrative tasks, 
          our solution puts the treatment journey at the center. By focusing specifically on treatment 
          monitoring, we're creating a specialized tool that fills a critical gap in healthcare 
          information systems.
        </p>
      </section>
      
      <section className="about-section roadmap">
        <h2>The Road Ahead</h2>
        <p>
          We're currently in the concept stage, refining our vision and developing the core 
          architecture of our system. We're actively seeking input from healthcare professionals 
          to ensure our solution addresses real-world challenges in patient treatment monitoring.
        </p>
        <p className="cta-text">
          Join us on our journey to create a healthcare monitoring system that makes a meaningful 
          difference in patient care.
        </p>
        <button className="cta-button">Contact Us</button>
      </section>
    </div>
  );
};

export default About;