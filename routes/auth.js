const router = require("express").Router();

const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require('../models/User');
const bcrypt1 = require('bcryptjs');

const {registerValidation} = require('../validation');



router.post('/register', async (req,res) => {

    // validate data before save
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking the user is exist
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    // Hash password
    const salt = await bcrypt1.genSalt(10);
    const hashedPassword = await bcrypt1.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try{
        const savedUser = await user.save();
        res.json(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;
