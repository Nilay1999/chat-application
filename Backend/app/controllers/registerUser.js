const { request } = require('http');
const mongoose = require('mongoose');
const user = require('../models/userSchema');

exports.register = (req, res) => {
    console.log(req.body)
    res.send({msg : 'Responce Message Received'});
}