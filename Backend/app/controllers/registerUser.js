const mongoose = require('mongoose');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {

    console.log(req.body)
    /*
    var {email,password,userName,firstName,lastName,phone} = req.body;

    User.findOne({email:email},function(err,data){
        if(data){
            res.json({msg:'user'})
        }
        else{
            bcrypt.genSalt(10, (err, salt) => {
                if (err){
                    throw err
                }
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err){ 
                        throw err
                    }
                    password = hash;
                    User({
                        email,
                        userName,
                        password,
                        firstName,
                        lastName,
                        phone
                    }).save((err,data)=>{
                        if(err)
                            console.log(err)
                        else 
                            res.json({msg:'success'})
                    })
                })
            })
        }
  });
  */
}