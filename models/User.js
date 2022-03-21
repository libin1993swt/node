const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        min:3,
        max:200
    },
    email:{
        type: String,
        required: true,
        min:5,
        max:200
    },
    password:{
        type: String,
        required: true,
        min:5,
        max:1024
    },
    date:{
        type: Date,
        Default: Date.now
    }
});

module.exports = mongoose.model('Users', userSchema);