const userId = localStorage.getItem("id");
let Row = document.querySelector(".sidenav");
let textarea = document.querySelector("#text-chat");
let messageArea = document.querySelector(".message__area");
var socket = io("http://localhost:3000", { transport: ["websocket"] });
let msgTo = document.querySelector(".brand");
let convId = sessionStorage.getItem("convId");

$("#logout").on("click", function () {
    localStorage.removeItem("x-auth-token", "id", "email");
    sessionStorage.removeItem("groupID", "groupName");
    window.location = "login.html";
});

$(document).ready(function () {
    msgTo.innerHTML = `
    <h1>${sessionStorage.getItem("groupName")}</h1>
    <button class="btn btn-danger ml-auto" onclick="leaveGroup('${sessionStorage.getItem(
        "groupID"
    )}')">Leave Group</button>
    `;
    $.ajax({
        url: `${url}/group/getGroupChat`,
        method: "post",
        data: {
            groupId: sessionStorage.getItem("groupID"),
        },
        success: function (msg) {
            msg.forEach((i) => {
                if (i.author._id == userId) {
                    appendMessage(i, "outgoing");
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
        url: `${url}/group/getGroup`,
        method: "post",
        data: {
            id: userId,
        },
        success: function (response) {
            let list = "";

            for (let groups of response) {
                list += `<i class="fa fa-ellipsis-v" aria-hidden="true"></i><button class="btn" id="${groups._id}" onclick="message('${groups._id}','${groups.groupName}')">${groups.groupName}</button>`;
            }
            Row.innerHTML = list;
        },
        error: function () {
            console.log("Server Error");
        },
    });
});

function message(id, Name) {
    console.log(id);
    sessionStorage.setItem("groupID", id);
    sessionStorage.setItem("groupName", Name);
    window.location = "groupList.html";
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
            socket.emit("refreshGroupChat");
            textarea.value = "";
            appendMessage(res, "outgoing");
            scrollToBottom();
        },
    });
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className, "message");
    if (type == "outgoing") {
        let markup = `
        <h4 id="${msg._id}">Me</h4>
        <p>${msg.body}</p>
    `;
        mainDiv.innerHTML = markup;
        messageArea.appendChild(mainDiv);
    } else {
        let markup = `
        <h4 id="${msg._id}">${msg.author.userName}</h4>
        <p>${msg.body}</p>
    `;
        mainDiv.innerHTML = markup;
        messageArea.appendChild(mainDiv);
    }
}

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

socket.on("loadGroupChat", function () {
    $.ajax({
        url: `${url}/group/getLastMessage`,
        method: "post",
        data: {
            groupId: sessionStorage.getItem("groupID"),
        },
        success: function (lastMsg) {
            console.log(lastMsg);
            if (lastMsg.author._id == userId) {
                appendMessage(lastMsg, "outgoing");
                scrollToBottom();
            } else {
                appendMessage(lastMsg, "incoming");
                scrollToBottom();
            }
        },
    });
});

function leaveGroup(id) {
    $.ajax({
        url: `${url}/group/leaveGroup`,
        method: "post",
        data: {
            groupId: id,
            userId: userId,
        },
        success: () => {
            window.location = "groupList.html";
        },
    });
}
