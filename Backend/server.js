const express = require('express');
const app = express();
const routes = require('./app/routes/route.js');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const mongoose = require('./connection'); // In-Use

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("dotenv").config();
app.use('/app/uploads', express.static('/uploads'))
app.use(cors());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running at Port : ${PORT}`);
})