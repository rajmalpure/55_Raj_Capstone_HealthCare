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


module.exports = router;
