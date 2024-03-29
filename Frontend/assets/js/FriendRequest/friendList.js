var row = document.querySelector("#friend-list");

$("#logout").on("click", function () {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    window.location = "login.html";
});

$("#notification").on("click", function () {
    location.href = "notification.html";
});

$(document).ready(function () {
    $.ajax({
        url: `${url}/friendList`,
        method: "post",
        data: {
            userId: localStorage.getItem("id"),
        },
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        success: function (Users) {
            console.log(Users);
            let userRow = "";
            var couter = "0";
            for (let user of Users) {
                couter++;
                userRow += `<tr class="text-center" id="data">
                                <td>${couter}</td>
                                <td>${user.email}</td>
                                <td>${user.userName}</td>
                                <td><button class="btn btn-info mr-2" id="Message" onclick="message('${user._id}')">Message</button>
    <button class="btn btn-danger mr-2" id="Message" onclick="message('${user._id}')">Delete</button></td>
                                
                            </tr>`;
            }
            row.innerHTML = userRow;
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

function message(id) {
    $.ajax({
        url: `${url}/createConv/${id}`,
        method: "post",
        data: {
            id: localStorage.getItem("id"),
        },
        success: function (response) {
            sessionStorage.setItem("convId", response.id);
            sessionStorage.setItem("userName", response.userName);
            window.location = "chatRoom.html";
        },
        error: function (xhr, status, error) {
            alert("server Error");
        },
    });
}
