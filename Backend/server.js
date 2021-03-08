const express = require('express');
const app = express();
const routes = require('./app/routes/route.js');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const mongoose = require('./connection'); // In-Use


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("dotenv").config();
app.use('/app/uploads', express.static('/uploads'))
app.use(cors());
app.use('/', routes);

const server = app.listen(PORT, () => {
    console.log(`Server running at Port : ${PORT}`);
})

const io = require('socket.io')(server)

io.on('connection', function(socket) {
    console.log("A user is connected");
});