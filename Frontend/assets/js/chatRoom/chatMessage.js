let textarea = document.querySelector("#text-chat");
let messageArea = document.querySelector(".message__area");
var socket = io("http://localhost:3000", { transport: ["websocket"] });
let msgTo = document.querySelector(".brand");
let convId = sessionStorage.getItem("convId");
let userId = localStorage.getItem("id");
let userName = sessionStorage.getItem("userName");
let friendRow = document.querySelector(".sidenav");

$("#logout").on("click", function () {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    sessionStorage.removeItem("convId");
    window.location = "login.html";
});

window.onload = function msgLoad() {
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
                    appendMessage(i, "outgoing");
                } else {
                    appendMessage(i, "incoming");
                }
                scrollToBottom();
            });
        },
        error: function () {
            //alert("Server Error");
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
            let list = "";

            for (let friend of Friends) {
                list += `<button class="btn" onclick="message('${friend._id}')">${friend.userName}</button>`;
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
};

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
            socket.emit("refreshChat");
        },
        error: function () {
            alert("Server Error");
        },
    });

    appendMessage(msg, "outgoing");
    textarea.value = "";

    scrollToBottom();
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className, "message");

    let markup = `
        <h4>${moment(msg.createdAt).format("h:mm")}</h4>
        <p>${msg.body}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

socket.on("loadChat", function () {
    $.ajax({
        url: `${url}/getConversation`,
        method: "post",
        data: {
            convId: convId,
        },
        success: function (response) {
            messageArea.innerHTML = "";
            response.forEach((i) => {
                if (i.author == userId) {
                    appendMessage(i, "outgoing");
                    scrollToBottom();
                } else {
                    appendMessage(i, "incoming");
                    scrollToBottom();
                }
            });
        },
        error: function () {
            alert("Server Error");
        },
    });
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

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
