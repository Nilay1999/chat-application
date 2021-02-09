const express = require('express');
const routes = express.Router();
const user = require('../models/userSchema');

/*  Register Section */

routes.post('/register', (req, res) => {
    console.log("Called")
});

/*  Register Section  Ends*/

/*  Login Section */

routes.post('/login', (req, res) => {
    res.json(req.body);
})

/*  Register Section  Ends*/

module.exports = routes;