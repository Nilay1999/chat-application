let textarea = document.querySelector("#text-chat");
let messageArea = document.querySelector(".message__area");
var socket = io("http://localhost:3000", { transport: ["websocket"] });
let msgTo = document.querySelector(".brand");
let convId = sessionStorage.getItem("convId");
let userId = localStorage.getItem("id");
let userName = sessionStorage.getItem("userName");

$("#logout").on("click", function () {
  localStorage.removeItem("x-auth-token");
  localStorage.removeItem("id");
  localStorage.removeItem("email");
  sessionStorage.removeItem("convId");
  window.location = "login.html";
});

window.onload = function msgLoad() {
  msgTo.innerHTML = `<h1>${userName}</h1>`;
  console.log(sessionStorage.getItem("userName"));
  $.ajax({
    url: `${url}/getConversation`,
    method: "post",
    data: {
      convId: convId,
    },
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
    success: function (response) {
      console.log(response);
      response.forEach((i) => {
        console.log(i.body);
        if (i.author == userId) {
          appendMessage(i, "outgoing");
        } else {
          appendMessage(i, "incoming");
        }
        scrollToBottom();
      });
    },
    error: function () {
      alert("Server Error");
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
        <h4><img src="../assets/images/clock.png" alt="clock">${moment(
          msg.createdAt
        ).format("h:mm")}</h4>
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
        console.log(i.body);
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
