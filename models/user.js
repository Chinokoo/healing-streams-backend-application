//modules
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

//mongoose schema.
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 130,
        required: true
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 130,
        required: true
    },
    phoneNumber: {
        type: String,
        minlength: 10,
        maxlength: 15,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true
    },
    churchBranch: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});
//generating a method.
userSchema.methods.generateToken = function () {
    return token = jwt.sign({ _id: this._id, firstName: this.firstName, phoneNumber: this.phoneNumber }, config.get("healing-streams-private-key"));
}

//mongoose model
const User = mongoose.model('User', userSchema);

//joi schema.
const joiSchema = Joi.object({
    firstName: Joi.string()
        .required()
        .min(3)
        .max(30),
    lastName: Joi.string()
        .required()
        .min(3)
        .max(130),
    phoneNumber: Joi.string()
        .required()
        .max(15)
        .min(10),
    password: Joi.string()
        .max(15)
        .min(6)
        .required(),
    churchBranch: Joi.string()
        .min(3)
        .max(30)
        .required()
}).options({ abortEarly: false });

//joi log in schema.
const logInSchema = Joi.object({
    phoneNumber: Joi.string()
        .required()
        .max(15)
        .min(10),
    password: Joi.string()
        .max(15)
        .min(6)
        .required()
}).optional({ abortEarly: false });


//globalization.
module.exports.User = User;
module.exports.logInSchema = logInSchema;
module.exports.joiSchema = joiSchema;