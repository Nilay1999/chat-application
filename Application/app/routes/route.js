const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const user = require('../models/userSchema');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/Internship', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Successfully connected'));


routes.get('/', (req, res) => {
    res.render('index');
});

routes.get('/register', (req, res) => {
    res.render('register');
});

routes.post('/register', (req, res) => {

    var { username, firstName, lastName, phone, password, email } = req.body;
    var err;
    user({
        username,
        firstName,
        lastName,
        phone,
        password,
        email
    }).save((err, data) => {
        if (err)
            console.log(err);
        else
            res.json(data);
    })


})

module.exports = routes;