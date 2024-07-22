const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
        Name : String,
        Email : String,
        Password : String,
        Specialization : String
})

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = {Doctor}