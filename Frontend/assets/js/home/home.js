var row = document.querySelector('.table');
const senderId = localStorage.getItem('id');
var socket = io('http://localhost:3000', { transport: ['websocket'] });
var notification = document.querySelector('#Notifications');

socket.emit('requestSend')

socket.on('notify', (data) => {
    // console.log(data)
    // data.forEach(element => {
    //     if (element._id == senderId) {
    //         notification.innerHTML = (element.notification.length);
    //     }
    // });
})

$('#notification').on('click', function() {
    location.href = "notification.html"
})

$('#logout').on('click', function() {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    window.location = 'login.html';
})

$(document).ready(function() {
    socket.on('Identification', (data) => {
        if (data._id == senderId) {
            notification.innerHTML = (data.notification.length);
        }
    })
    $.ajax({
        url: `${url}/home`,
        method: 'get',
        headers: { "x-auth-token": localStorage.getItem('x-auth-token') },
        success: function(Users) {
            let userRow = '';
            var couter = '0';
            for (let user of Users) {
                couter++;
                userRow += `<tr class="text-center" id="data">
                                <td>${couter}</td>
                                <td>${user.email}</td>
                                <td>${user.userName}</td>
                                <td>${user.phone}</td>
                                <td><button class="btn btn-info mr-2" id="addFriend" onclick="addFriend('${user._id}')">Add Friend</button>
                                    <button class="btn btn-warning" id="viewProfile" onclick="viewProfile('${user._id}')">View Profile</button>
                                </td>
                            </tr>`
            }
            row.innerHTML = userRow;
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

function addFriend(id) {

    const email = localStorage.getItem('email');
    socket.emit('requestSend');
    socket.emit('requestMsg');

    $(document).ready(function() {
        $.ajax({
            url: `${url}/addFriend/${id}`,
            method: 'post',
            data: {
                '_id': senderId,
                'email': email
            },
            success: function(responce) {
                alert(responce.msg)

            },
            error: function() {
                alert("Server Error")
            }
        })
    })

}


function viewProfile(id) {
    localStorage.setItem('profile-id', id);
    window.location = "viewProfile.html"
}