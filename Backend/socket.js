const User = require('./app/models/userSchema');

module.exports = function(io) {
    var id, userData;
    io.on('connection', (socket) => {
        socket.on('requestSend', () => {
            setTimeout(() => {
                User.find({}).then((result) => {
                    io.emit('notify', result)
                })
            }, 1000);
        })

        socket.on('requestMsg', () => {
            setTimeout(() => {
                User.find({}).then((result) => {
                    io.emit('receiveMsg', result)
                })
            }, 1000);
        })
    });
};