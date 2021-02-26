const id = localStorage.getItem('profile-id');
const card = document.querySelector('.card');
const navlink = document.querySelector('#navbar-ul');

$('#logout').on('click', function() {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    window.location = 'login.html';
})


$(document).ready(function() {
    console.log(id)
    $.ajax({
        url: `http://localhost:8080/profile/${id}`,
        method: 'post',
        headers: { "x-auth-token": localStorage.getItem('x-auth-token') },
        success: function(User) {
            let name = `<li class="nav-item active">
                            <a class="nav-link" href="profile.html">${User.userName}</a></li> `
            navlink.innerHTML = name;
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
            localStorage.removeItem('profile-id')

        },
        error: function() {

        }
    })
})