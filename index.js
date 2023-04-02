//loading the modules.
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const registration = require('./routes/registrations')
const churches = require('./routes/churches');
const users = require('./routes/users');

if (!config.get('healing-streams-private-key')) {
    console.error('healing-streams-private-key key not defined!');
    process.exit(1);
}

//middleware functions.
app.use(express.json());
app.use(cors());
app.use(churches);
app.use(users);
app.use(registration);

//connecting to the database.
mongoose.connect('mongodb://127.0.0.1:27017/healing-stream')
    .then(() => console.log('connection to the database is successfull.'))
    .catch(() => console.log('connection to the database is not successfull'));

// starting the server.
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server started at port ${port}`));
