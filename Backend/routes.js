const express = require('express');
const router = express.Router();
const { Doctor } = require('./Doctorschema');
const { Patient } = require('./Userschema');
require('dotenv').config();

router.use(express.json());

const handleErrors = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: 'An error occurred' });
};

router.get('/doctor', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    console.log("Doctors:", doctors);
    res.json(doctors);
  } catch (error) {
    handleErrors(res, error);
  }
});

router.get('/patient', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    handleErrors(res, error);
  }
});

router.post('/doctors', async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
  } catch (error) {
    handleErrors(res, error);
  }
});

router.post('/patients', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
  } catch (error) {
    handleErrors(res, error);
  }
});

router.put('/doctors/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ message: 'Doctor updated successfully', doctor });
  } catch (error) {
    handleErrors(res, error);
  }
});


router.put('/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json({ message: 'Patient updated successfully', patient });
  } catch (error) {
    handleErrors(res, error);
  }
});

router.delete('/doctors/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    handleErrors(res, error);
  }
});

router.delete('/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    handleErrors(res, error);

  }
});

module.exports = router;