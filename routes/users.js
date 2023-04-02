//modules.
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, joiSchema, logInSchema } = require('../models/user');
const { Church } = require('../models/church');
const user = require('../middleware/user');

//signing in
router.post('/api/signin', async (req, res) => {
    const validate = joiSchema.validate(req.body);
    if (validate.error) return res.status(400).send(validate.error.message);

    const church = await Church.findOne({ churchBranch: req.body.churchBranch });
    if (!church) return res.status(400).send('Church Branch not found');

    let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (user) return res.status(400).send('User already exist');

    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        churchBranch: req.body.churchBranch
    });

    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    await user.save();
    const lou = _.pick(user, ['firstName', 'lastName', 'phoneNumber', 'churchBranch']); //lou stands for lodash user kkk.
    res.send(lou)
});

//logging in.
router.post('/api/login', async (req, res) => {
    const validate = logInSchema.validate(req.body);
    if (validate.error) return res.status(400).send(validate.error.message);

    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (!user) return res.status(404).send('invalid phone number or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid phone number or password.');

    const token = user.generateToken();
    res.send(token);
});

//globalisation.
module.exports = router;
