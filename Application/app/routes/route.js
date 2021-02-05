const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path')

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

module.exports = routes;