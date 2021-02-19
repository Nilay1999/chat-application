var row = document.querySelector('tbody');

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
                userRow += `<tr>
                                <th scope="row">${couter}</th>
                                <td>${user.email}</td>
                                <td>${user.userName}</td>
                                <td>${user.phone}</td>
                            </tr>`
            }
            row.innerHTML = userRow;
        },
        error: function() {
            alert("Server Error");
        }
    })
})