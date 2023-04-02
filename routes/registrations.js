//modules
const express = require('express');
const router = express.Router();
const { Register, joiSchema } = require('../models/registration');
const user = require('../middleware/user');


//registering people.
router.post('/api/registration', user, async (req, res) => {
    const validate = joiSchema.validate(req.body);
    if (validate.error) return res.status(400).send(validate.error.message);

    const registered = await Register.findOne({ phoneNumber: req.body.phoneNumber });
    if (registered) return res.status(400).send('The user with the following phone number is already registered.');

    const register = new Register({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        residence: req.body.residence,
        phoneNumber: req.body.phoneNumber,
        registeredBy: req.user.firstName
    });
    await register.save();
    res.send(register);
});

//getting a regitration.
router.get('/api/registration', user, async (req, res) => {
    const registrations = await Register.find({ registeredBy: req.user.firstName }).sort('firstName');
    res.send(registrations);
});
router.get('/api/registration/:id', user, async (req, res) => {
    const registrations = await Register.findById(req.params.id);
    res.send(registrations);
});

//globalization.
module.exports = router;