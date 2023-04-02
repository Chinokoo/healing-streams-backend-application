//modules here.
const express = require('express');
const { Church, joiSchema } = require('../models/church');
const router = express.Router();
const users = require('../middleware/user');

//creating a new church.
router.post('/api/churches', users, async (req, res) => {
    const validate = joiSchema.validate(req.body);
    if (validate.error) return res.status(400).send(validate.error.message);

    const churchBranch = await Church.findOne({ churchBranch: req.body.churchBranch });
    if (churchBranch) return res.status(400).send('church branch already available.');

    const church = new Church({
        churchBranch: req.body.churchBranch
    });
    await church.save();
    res.send(church);
});

//getting churches from the database.
router.get('/api/churches', users, async (req, res) => {

    const churches = await Church.find().sort('churchBranch');
    res.send(churches);
});
router.get('/api/churches/:id', async (req, res) => {
    const church = await Church.findById(req.params.id);
    if (!church) return res.status(404).send('Church not found!');
    res.send(church);
});

//updating churchBranch.
router.put('/api/churches/:id', users, async (req, res) => {
    const validate = joiSchema.validate(req.body);
    if (validate.error) return res.status(400).send(validate.error.message);

    const church = await Church.findByIdAndUpdate(req.params.id, {
        churchBranch: req.body.churchBranch
    }, { new: true });
    if (!church) return res.status(404).send('Church not found!');
    res.send(church);
});
//deleting a church from the gatabase.
router.delete('/api/churches/:id', users, async (req, res) => {
    const church = await Church.findByIdAndDelete(req.params.id);
    if (!church) return res.status(404).send('Church not found!');
    res.send(church);
});

//globalizaton.
module.exports = router;