$('#logout').on('click', function() {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    window.location = 'login.html';
})
var id = localStorage.getItem('id');
var list = document.querySelector('.comment');
var socket = io('http://localhost:3000', { transport: ['websocket'] });
const commentBox = document.querySelector('.comment__box')

socket.emit('loadMsg', id);

socket.on('receiveMsg', (data) => {
    console.log(data)
    appendToDom(data.msg)
})

function appendToDom(msg) {
    let lTag = document.createElement('li')
    lTag.classList.add('comment', 'mb-3')

    commentBox.innerHTML = '';
    let markup = '';
    msg.forEach(i => {
        markup += `<div class="card border-light mb-3">
                    <div class="card-body">
                    <p>${i.body}</p>
                    <div>
                        <img src="../assets/images/clock.png" alt="clock">
                        <small>${moment(i.created_at).format('LT')}</small>
                    </div>
                    </div>
                </div>`
    });
    lTag.innerHTML = markup
    commentBox.append(lTag)

    $.ajax({
        url: `${url}/readNotification`,
        method: 'post',
        data: {
            id: id
        },

        success: function(res) {
            console.log("success")
        },
        error: function() {
            alert("Server Error")
        }
    })
}

$(document).ready(function() {
    $.ajax({
        url: `${url}/readNotification`,
        method: 'post',
        data: {
            id: id
        },
        success: function(res) {
            console.log(res)
        },
        error: function() {
            alert("Server Error")
        }
    })
})