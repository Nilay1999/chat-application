const card = document.querySelector(".card");
const id = localStorage.getItem("id");

$("#notification").on("click", function () {
    location.href = "notification.html";
});

$("#logout").on("click", function () {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    window.location = "login.html";
});

$(document).ready(function () {
    $.ajax({
        url: `${url}/profile/${id}`,
        method: "post",
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        success: function (User) {
            console.log(User.img);
            let cardData = `<img class="card-img-top" src="../../Backend/app/uploads/${User.img}" alt="Card image cap">
                <div class="card-body">
                <table class="table">
                    <tbody>
                        <tr>
                            <td>UserName<td>
                            <td>${User.userName}<td>
                            <td><button class="btn btn-info"><i class="fa fa-pencil" aria-hidden="true"></i></button></td>   
                        </tr>
                        <tr>
                            <td>FirstName<td>
                            <td>${User.firstName}<td>
                            <td><button class="btn btn-info"><i class="fa fa-pencil" aria-hidden="true"></i></button></td>
                        </tr>
                        <tr>
                            <td>LastName<td>
                            <td>${User.lastName}<td>
                            <td><button class="btn btn-info"><i class="fa fa-pencil" aria-hidden="true"></i></button></td>
                        </tr>
                        <tr>
                            <td>Contact Number<td>
                            <td>${User.phone}<td>
                            <td><button class="btn btn-info"><i class="fa fa-pencil" aria-hidden="true"></i></button></td>
                        </tr>
                    </tbody>
                </table>
                   
                </div>`;
            card.innerHTML = cardData;
        },
        error: function (xhr, status, error) {
            if (!localStorage.getItem("x-auth-token")) {
                alert("No token");
                window.location = "login.html";
            } else {
                alert("server Error");
            }
        },
    });
});
