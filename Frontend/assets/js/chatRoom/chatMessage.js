let textarea = document.querySelector('#text-chat');
let messageArea = document.querySelector('.message__area')
var socket = io('http://localhost:3000', { transport: ['websocket'] });

let convId = sessionStorage.getItem('convId');
let userId = localStorage.getItem('id')

$('#logout').on('click', function() {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    sessionStorage.removeItem('convId');
    window.location = 'login.html';
})

window.onload = function msgLoad() {
    $.ajax({
        url: `${url}/getConversation`,
        method: 'post',
        data: {
            convId: convId,
        },
        headers: { "x-auth-token": localStorage.getItem('x-auth-token') },
        success: function(response) {
            console.log(response);
            response.forEach(i => {
                console.log(i.body)
                if (i.author == userId) {
                    appendMessage((i), 'outgoing')
                } else {
                    appendMessage((i), 'incoming')
                }
                scrollToBottom()
            });

        },
        error: function() {
            alert('Server Error')
        }
    })
}


textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        body: message.trim()
    }

    $.ajax({
        url: `${url}/addMsg`,
        method: 'post',
        data: {
            convId: convId,
            userId: userId,
            msgBody: message
        },
        headers: { "x-auth-token": localStorage.getItem('x-auth-token') },
        success: function(response) {
            console.log(message);
        },
        error: function() {
            alert('Server Error')
        }
    })

    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    socket.emit('refreshChat')

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4><img src="../assets/images/clock.png" alt="clock">${moment(msg.createdAt).format('h:m')}</h4>
        <p>${msg.body}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

socket.on('loadChat', function() {
    $.ajax({
        url: `${url}/getConversation`,
        method: 'post',
        data: {
            convId: convId,
        },
        success: function(response) {
            messageArea.innerHTML = '';
            response.forEach(i => {
                console.log(i.body)
                if (i.author == userId) {
                    appendMessage((i), 'outgoing')
                    scrollToBottom()
                } else {
                    appendMessage((i), 'incoming')
                    scrollToBottom()
                }
            });

        },
        error: function() {
            alert('Server Error')
        }
    })
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}