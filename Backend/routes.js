const express = require('express');
const router = express.Router();
const  {Doctor} = require('./Doctorschema');
const  {Patient} = require('./Userschema');
require('dotenv').config();

router.use(express.json()) 


router.get('/doctor', async (req, res) => {
    try {
      const doctors = await Doctor.find();
      console.log("Doctors:", doctors); // Log the data to console
      res.json(doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      res.status(500).json({ error: 'Failed to fetch doctors' });
    }
  });
  

  router.get('/patients', async (req, res) => {
    try {
      const patients = await Patient.find();
      res.json(patients);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch patients' });
    }
  });

  router.post('/doctors', async (req, res) => {
    try {
      const newDoctor = new Doctor(req.body);
      await newDoctor.save();
      res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create doctor' });
    }
  });

  
  router.post('/patients', async (req, res) => {
    try {
      const newPatient = new Patient(req.body);
      await newPatient.save();
      res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create patient' });
    }
  });



module.exports = router;
