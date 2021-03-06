const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();
app.listen(3000);

// Connect to Database
const config = require('./config/database');
mongoose.connect(config.database)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middlewares
app.use(bodyParser.json());

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// User Routes will be configured in this folder
const users = require('./routes/users');
app.use('/user', users);

// Client-Side Files builded by Angular-CLI will be in this folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes Settings
app.get('/', (req, res) => {
    res.send();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
