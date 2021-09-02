const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/Internship';

mongoose
    .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Successfully connected to DataBase'));

module.exports = mongoose;
