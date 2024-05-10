const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
        Name : String,
        Email : String,
        Password : String,
        Specialization : String
})

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = {Doctor}