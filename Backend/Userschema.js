const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
        Name : String,
        Email : String,
        Password : String,
        Medical_history : String,
        Treatment_details : String
})

const Patient = mongoose.model('patient', patientSchema);

module.exports = {Patient}