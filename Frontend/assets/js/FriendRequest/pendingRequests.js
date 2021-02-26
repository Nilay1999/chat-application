const User = require("../../../../Backend/app/models/userSchema");

var row = document.querySelector('.table');
const senderId = localStorage.getItem('id');

$('#logout').on('click', function() {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('id');
    window.location = 'login.html';
})

$(document).ready(function() {
    $.ajax({
        url: `http://localhost:8080/requestAction`,
        method: 'post',
        data: { '_id': senderId },
        headers: { "x-auth-token": localStorage.getItem('x-auth-token') },
        success: function(Users) {
            console.log(Users)

        },
        error: function(xhr, status, error) {
            if (!localStorage.getItem('x-auth-toke')) {
                alert('No token');
                window.location = 'login.html';
            } else {
                alert('server Error')
            }
        }
    })
})