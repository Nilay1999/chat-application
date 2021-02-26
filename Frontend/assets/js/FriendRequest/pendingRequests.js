var row = document.querySelector('.table');
const senderId = localStorage.getItem('id');

$('#logout').on('click', function() {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    window.location = 'login.html';
})

$(document).ready(function() {
    $.ajax({
        url: `http://localhost:8080/requestAction`,
        method: 'post',
        data: { '_id': senderId },
        headers: { "x-auth-token": localStorage.getItem('x-auth-token') },
        success: function(Users) {
            let userRow = '';
            var couter = '0';
            for (let user of Users) {
                couter++;
                userRow += `<tr class="text-center" id="data">
                                <td>${couter}</td>
                                <td>${user.senderEmail}</td>
                                <td><button class="btn btn-info mr-2" id="accept" onclick="accept('${user._id}')")>Accept</button>
                                    <button class="btn btn-warning" id="reject" onclick="reject('${user._id}')">Reject</button>
                                </td>
                            </tr>`
            }
            row.innerHTML = userRow;
        },
        error: function(xhr, status, error) {
            if (!localStorage.getItem('x-auth-token')) {
                alert('No token');
                window.location = 'login.html';
            } else {
                alert('server Error')
            }
        }
    })
})

function accept(id) {
    const acceptId = localStorage.getItem('id');
    $.ajax({
        url: `http://localhost:8080/accpetRequest/${id}`,
        method: 'post',
        data: {
            'userId': acceptId
        },
        success: function() {
            console.log("Success")
        },
        error: function() {
            console.log("Error")
        }
    })
}