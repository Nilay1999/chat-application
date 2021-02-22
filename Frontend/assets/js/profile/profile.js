const card = document.querySelector('.card');
const id = localStorage.getItem('id');
$('#logout').on('click', function() {
    localStorage.removeItem('x-auth-token');
    window.location = 'login.html';
})

$(document).ready(function() {
    $.ajax({
        url: `http://localhost:8080/profile/${id}`,
        method: 'post',
        headers: { "x-auth-token": localStorage.getItem('x-auth-token') },
        success: function(User) {
            console.log(User.password);
            let cardData =
                `<img class="card-img-top" src="../../Backend/app/uploads/${User.img}" alt="Card image cap">
                <div class="card-body">
                    <ul class="list-group list-group-flush text-center">
                        <li class="list-group-item">${User.userName}</li>
                        <li class="list-group-item">${User.email}</li>
                        <li class="list-group-item">${User.firstName}</li>
                        <li class="list-group-item">${User.lastName}</li>
                        <li class="list-group-item">${User.phone}</li>
                    </ul>
                </div>`;
            card.innerHTML = cardData;
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