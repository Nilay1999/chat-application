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

io.on('connection', function(socket) {
    console.log("============start-session event================")
    console.log(data)
    if (data.sessionId == null) {
        var session_id = uuidv4(); //generating the sessions_id and then binding that socket to that sessions 
        socket.room = session_id;
        socket.join(socket.room, function(res) {
            console.log("joined successfully ")
            socket.emit("set-session-acknowledgement", { sessionId: session_id })
        })
    } else {
        socket.room = data.sessionId; //this time using the same session 
        socket.join(socket.room, function(res) {
            console.log("joined successfully ")
            socket.emit("set-session-acknowledgement", { sessionId: data.sessionId })
        })
    }
})



http.listen(PORT, () => {
    console.log(`Server running at Port : ${PORT}`);
})