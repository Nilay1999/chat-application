const userId = localStorage.getItem("id");
let Row = document.querySelector(".sidenav");
let textarea = document.querySelector("#text-chat");
let messageArea = document.querySelector(".message__area");
var socket = io("http://localhost:3000", { transport: ["websocket"] });
let msgTo = document.querySelector(".brand");
let convId = sessionStorage.getItem("convId");

$(document).ready(function () {
    $.ajax({});

    $.ajax({
        url: `${url}/group/getGroup`,
        method: "post",
        data: {
            id: userId,
        },
        success: function (response) {
            let list = "";

            for (let groups of response) {
                list += `<button class="btn" id="${groups._id}" onclick="message('${groups._id}')">${groups.groupName}</button>`;
            }
            Row.innerHTML = list;
        },
        error: function () {
            alert("Server Error");
        },
    });
});

function message(id) {
    console.log(id);
    sessionStorage.setItem("groupID", id);
    $.ajax({
        url: ``,
        method: "post",
        data: {},
    });
}

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
        url: `${url}/group/addMessage`,
        method: "post",
        data: {
            userId: userId,
            groupId: sessionStorage.getItem("groupID"),
            msg: msg.body,
        },
        success: function (res) {
            console.log(res);
        },
    });
    textarea.value = "";
    appendMessage(msg, "outgoing");
    scrollToBottom();
}

function appendMessage(msg, type, status) {
    let mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className, "message");

    let markup = `
        <h4 id="${msg._id}">name</h4>
        <p>${msg.body}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}
