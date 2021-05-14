let textarea = document.querySelector("#text-chat");
let messageArea = document.querySelector(".message__area");
var socket = io("http://localhost:3000", { transport: ["websocket"] });
let msgTo = document.querySelector(".brand");
let convId = sessionStorage.getItem("convId");
let userId = localStorage.getItem("id");
let userName = sessionStorage.getItem("userName");
let friendRow = document.querySelector(".sidenav");
let friendList = "";

$("#logout").on("click", function () {
    socket.emit("offline", localStorage.getItem("id"));
    localStorage.removeItem("x-auth-token", "id");
    window.location = "login.html";
});

$(document).ready(function () {
    msgTo.innerHTML = `<h1>${userName}</h1>`;

    $.ajax({
        url: `${url}/getConversation`,
        method: "post",
        data: {
            convId: convId,
        },
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        success: function (response) {
            response.forEach((i) => {
                if (i.author == userId) {
                    appendMessage(i, "outgoing", i.status);
                } else {
                    appendMessage(i, "incoming");
                }
                scrollToBottom();
            });
        },
        error: function () {
            console.log("Server Error");
        },
    });

    $.ajax({
        url: `${url}/friendList`,
        method: "post",
        data: {
            userId: localStorage.getItem("id"),
        },
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        success: function (Friends) {
            friendList = Friends;

            let list = "";

            for (let friend of Friends) {
                if (friend.online == true) {
                    list += `<button class="btn btn-outline-success" id="${friend._id}" onclick="message('${friend._id}')">${friend.userName}</button>`;
                } else {
                    list += `<button class="btn" id="${friend._id}" onclick="message('${friend._id}')">${friend.userName}</button>`;
                }
            }
            friendRow.innerHTML = list;
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

    $.ajax({
        url: `${url}/markAsRead`,
        method: "post",
        data: {
            id: sessionStorage.getItem("receiver"),
        },
    });

    $.ajax({
        url: `${url}/loadLastMessage`,
        method: "post",
        data: {
            convId: convId,
        },
        success: function (i) {
            socket.emit("Marked", i);
        },
        error: function () {},
    });
});

textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (e.target.value == "") {
            alert("please Enter msg");
        } else {
            sendMessage(e.target.value);
        }
    }
});

function sendMessage(message) {
    let msg = {
        body: message.trim(),
    };

    $.ajax({
        url: `${url}/addMsg`,
        method: "post",
        data: {
            convId: convId,
            userId: userId,
            msgBody: message,
        },
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        success: function (response) {
            socket.emit("refreshChat", sessionStorage.getItem("receiver"));
            textarea.value = "";

            appendMessage(response, "outgoing", response.status);
            scrollToBottom();
        },
        error: function () {
            alert("Server Error");
        },
    });
}

function appendMessage(msg, type, status) {
    let mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className, "message");

    if (status == 3) {
        let markup = `
        <div id="${msg._id}">
        <h4>${moment(msg.createdAt).format(
            "DD/MM hh:mm"
        )} &nbsp<i class="fa fa-check-circle" aria-hidden="true"></i></h4>
        <p>${msg.body}</p>
       
        </div>
    `;
        mainDiv.innerHTML = markup;
        messageArea.appendChild(mainDiv);
    } else {
        let markup = `
        <h4 id="${msg._id}">${moment(msg.createdAt).format("DD/MM hh:mm")}</h4>
        <p>${msg.body}</p>
    `;
        mainDiv.innerHTML = markup;
        messageArea.appendChild(mainDiv);
    }
}

socket.on("addMark", function (message) {
    setTimeout(() => {
        if (message.status == 3) {
            if (message.author == userId) {
                var msg = document.getElementById(`${message._id}`);
                let icon = document.createElement("i");
                icon.classList.add("ml-1", "fa", "fa-check-circle");
                msg.appendChild(icon);
            }
        }
    }, 2000);
});

socket.on("loadMark", function (message) {
    setTimeout(() => {
        if (message.status == 3) {
            if (message.author == userId) {
                var msg = document.getElementById(`${message._id}`);
                let icon = document.createElement("i");
                icon.classList.add("ml-1", "fa", "fa-check-circle");
                msg.appendChild(icon);
            }
        }
    }, 2000);
});

socket.on("loadChat", function () {
    setTimeout(() => {
        $.ajax({
            url: `${url}/loadLastMessage`,
            method: "post",
            data: {
                convId: convId,
            },
            success: function (i) {
                socket.emit("markAsRead", i);
                console.log(i);
                if (i.author == userId) {
                    appendMessage(i, "outgoing", i.status);
                    scrollToBottom();
                } else {
                    appendMessage(i, "incoming");
                    scrollToBottom();
                }
            },
            error: function () {
                alert("Server Error");
            },
        });
    }, 1000);

    $.ajax({
        url: `${url}/markAsRead`,
        method: "post",
        data: {
            id: sessionStorage.getItem("receiver"),
        },
    });
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

socket.on("refreshList", () => {
    $.ajax({
        url: `${url}/friendList`,
        method: "post",
        data: {
            userId: localStorage.getItem("id"),
        },
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        success: function (Friends) {
            friendList = Friends;

            let list = "";

            for (let friend of Friends) {
                if (friend.online == true) {
                    list += `<button class="btn btn-outline-success" id="${friend._id}" onclick="message('${friend._id}')">${friend.userName}</button>`;
                } else {
                    list += `<button class="btn" id="${friend._id}" onclick="message('${friend._id}')">${friend.userName}</button>`;
                }
            }
            friendRow.innerHTML = list;
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
            sessionStorage.setItem("receiver", id);
            window.location = "chatRoom.html";
        },
        error: function (xhr, status, error) {
            alert("server Error");
        },
    });
}
