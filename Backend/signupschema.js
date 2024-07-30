const mongoose = require('mongoose');

const signupschema = new mongoose.Schema({
    username: String,
    password: String
});

const Signup = mongoose.model('signup-collections', signupschema);

module.exports = { Signup };
