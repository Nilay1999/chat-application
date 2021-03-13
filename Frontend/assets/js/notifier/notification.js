$('#logout').on('click', function() {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    window.location = 'login.html';
})

var list = document.querySelector('.comment');

var socket = io('http://localhost:3000', { transport: ['websocket'] });
var id = localStorage.getItem('id');

// socket.emit('connecting', id)

// socket.on('connected', (data) => {
//     if (data._id == id) {
//         let msg = '';
//         for (let i of data.notification) {
//             msg +=
//                 `
//             <div class="card border-light mb-3">
//                 <div class="card-body">
//                         <p>${i.msg}</p>
//                 </div>
//             </div>
//             `
//         }
//         list.innerHTML = msg;
//     }
// })