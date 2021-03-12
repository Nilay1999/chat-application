const User = require('./app/models/userSchema');

module.exports = function(io) {
    var id, userData;
    io.on('connection', (socket) => {
        console.log('User Connected ...')
        socket.on('requestSend', (userId) => {
            id = userId;
            setTimeout(() => {
                User.findOne({ _id: userId }).then((result) => {
                    io.emit('Identification', result)
                })
            }, 1000);
        })

        socket.on('connecting', (userId) => {
            setTimeout(() => {
                User.findOne({ _id: userId }).then((result) => {
                    io.emit('connected', result)
                })
            }, 1000);
        })
    });
};