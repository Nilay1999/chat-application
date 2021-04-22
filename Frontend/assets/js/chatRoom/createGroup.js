let list = document.querySelector("#friendList");

$("#logout").on("click", function () {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    sessionStorage.removeItem("convId");
    window.location = "login.html";
});

$(document).ready(function () {
    $("#loadList").click(function () {
        let name = document.querySelector("#groupName").value;
        let adminId = localStorage.getItem("id");

        $.ajax({
            url: `${url}/group/createGroup`,
            method: "post",
            data: {
                id: adminId,
                name: name,
            },
            success: function (res) {
                alert(res.msg);
            },
            error: function () {
                alert("Server Error");
            },
        });

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
                for (let user of Users) {
                    userRow += ` 
                    <li class="w3-bar">
                        <button class="w3-right btn btn-success mt-3 btn-lg">Add</button>
                        <img src="../../Backend/app/uploads/${user.img}" class="w3-bar-item  w3-circle w3-hide-small" style="width:85px;height:70px">
                        <div class="w3-bar-item">
                            <span class="w3-large">${user.userName}</span><br>
                            <span>${user.email}</span>
                        </div>
                    </li>`;
                }
                list.innerHTML = userRow;
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
});
