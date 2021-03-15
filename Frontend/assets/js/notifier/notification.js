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

socket.emit('requestMsg');

socket.on('receiveMsg', (data) => {
    data.forEach(element => {
        if (element._id == id) {
            appendToDom(element.notification)
        }
    });
})

function appendToDom(msgArray) {
    let lTag = document.createElement('li')
    lTag.classList.add('comment', 'mb-3')

    commentBox.innerHTML = '';
    let markup = '';
    msgArray.forEach(i => {
        markup += `<div class="card border-light mb-3">
                    <div class="card-body">
                    <p>${i.msg}</p>
                    <div>
                                    <img src="../assets/images/clock.png" alt="clock">
                                    <small>${moment(i.created_at).format('LT')}</small>
                                </div>
                    </div>
                </div>`
    });
    lTag.innerHTML = markup
    commentBox.append(lTag)
}