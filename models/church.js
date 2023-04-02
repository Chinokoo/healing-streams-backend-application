//modules here.
const mongoose = require('mongoose');
const Joi = require('joi');

//mongoose schema.
const Church = mongoose.model('Church', new mongoose.Schema({
    churchBranch: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    }
}));

//joi schema
const joiSchema = Joi.object({
    churchBranch: Joi.string()
        .required()
        .min(3)
        .max(30)
});

//grobalization.
module.exports.Church = Church;
module.exports.joiSchema = joiSchema