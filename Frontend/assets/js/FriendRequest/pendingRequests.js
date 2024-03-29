var row = document.querySelector(".table");
const senderId = localStorage.getItem("id");
var socket = io("http://localhost:3000", { transport: ["websocket"] });

$("#logout").on("click", function () {
    localStorage.removeItem("x-auth-token", "id", "email");
    window.location = "login.html";
});

$("#notification").on("click", function () {
    location.href = "notification.html";
});

$(document).ready(function () {
    $.ajax({
        url: `${url}/pendingRequest`,
        method: "post",
        data: { _id: senderId },
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        success: function (Users) {
            if (Users.msg == null) {
                let userRow = "";
                var couter = "0";
                for (let user of Users) {
                    couter++;
                    userRow += `<tr class="text-center" id="data">
                                    <td>${couter}</td>
                                    <td>${user.senderEmail}</td>
                                    <td><button class="btn btn-info mr-2" id="accept" onclick="accept('${user.sender}')")>Accept</button>
                                        <button class="btn btn-warning" id="reject" onclick="reject('${user.sender}')">Reject</button>
                                    </td>
                                </tr>`;
                }
                row.innerHTML = userRow;
            } else {
                row.remove();
                document.querySelector(
                    ".info"
                ).innerHTML = `<h3 class="text-center">${Users.msg}</h3>`;
            }
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

function accept(id) {
    socket.emit("requestSend", id);
    socket.emit("requestMsg", id);

    const acceptId = localStorage.getItem("id");
    $.ajax({
        url: `${url}/acceptRequest/${id}`,
        method: "post",
        data: {
            userId: acceptId,
        },
        success: function () {
            window.location.reload();
            console.log("Accepted");
        },
        error: function () {
            console.log("Error");
        },
    });
}

function reject(id) {
    const rejectId = localStorage.getItem("id");
    $.ajax({
        url: `${url}/rejectRequest/${id}`,
        method: "post",
        data: {
            userId: rejectId,
        },
        success: function () {
            window.location.reload();
            console.log("Rejected");
        },
        error: function () {
            console.log("Server Error");
        },
    });
}
