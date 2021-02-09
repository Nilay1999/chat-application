const { request } = require('http');
const mongoose = require('mongoose');
const user = require('../models/userSchema');

exports.login = (request, response) => {
    console.log("Login");
}