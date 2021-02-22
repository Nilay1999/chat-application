var row = document.querySelector('.table');

$('#logout').on('click', function() {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('id');
    window.location = 'login.html';
})

$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:8080/home',
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