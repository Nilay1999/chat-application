const express = require('express');
const app = express();
const routes = require('./app/routes/route.js');
const path = require('path')
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./connection'); // In-Use

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // JSON object
app.use(express.static(path.join(__dirname + '/assets')));
app.use('/uploads', express.static('uploads'))
app.use(cors());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running at Port : ${PORT}`);
})