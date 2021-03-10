const express = require('express');
const app = express();
const routes = require('./app/routes/route.js');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const mongoose = require('./connection'); // In-Use
const http = require('http').createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("dotenv").config();

app.use('/app/uploads', express.static('/uploads'))
app.use(cors({ origin: 'http://localhost:5500' }));

app.use('/', routes);
app.set('socketio', io)

var clients = 0;
io.on('connection', function(socket) {
    clients++;
    console.log(socket.id)
    socket.emit('newclientconnect', { description: 'Hey, welcome!' });
    socket.broadcast.emit('newclientconnect', { description: clients + ' clients connected!' })
    socket.on('disconnect', function() {
        clients--;
        socket.broadcast.emit('newclientconnect', { description: clients + ' clients connected!' })
        console.log(socket.id + " : Disconnected ")
    });
});


http.listen(PORT, () => {
    console.log(`Server running at Port : ${PORT}`);
})