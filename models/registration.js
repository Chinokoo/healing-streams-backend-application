//modules.
const mongoose = require('mongoose');
const Joi = require('joi');
const { optional } = require('joi');

//mongoose schema.
const registrationShema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    gender: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 8
    },
    dateOfBirth: {
        type: Date.UTC(),
    },
    residence: {
        type: String,
        required: false,
        minlength: 2,
        maxlenght: 20
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15
    },
    registeredBy: {
        type: String,
        minlength: 3,
        maxlength: 30
    }
});

//mongoose model
const Register = mongoose.model('Register', registrationShema);

//Joi schema
const joiSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    gender: Joi.string().min(4).max(8).required(),
    dateOfBirth: Joi.date(),
    residence: Joi.string().min(2).max(20),
    phoneNumber: Joi.string().required().min(10).max(15),
}).options({ abortEarly: false });

module.exports.Register = Register;
module.exports.joiSchema = joiSchema;