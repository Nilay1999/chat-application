const postDiv = document.querySelector(".post-area");

$("#logout").on("click", function () {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    window.location = "login.html";
});

$(document).ready(function () {
    $.ajax({
        url: `${url}/post/viewPosts`,
        method: "post",
        success: function (posts) {
            let postRow = "";
            posts.forEach((i) => {
                postRow += `<div class="row py-4">
                <div class="col-lg-6 mx-auto">
                    <h3>${i.author}</h3>
                    <div class="image-area mt-4">
                        <img id="imageResult"
                            src="../../Backend/${i.image}"
                            class="img-fluid rounded shadow-sm mx-auto d-block">
                        <h6 class="mt-3">${i.description}</h6>
                    </div>
                    <div class="btn-group mt-2" role="group" aria-label="Basic example">
                        <button onClick="like('${i._id}')" id="${i._id}" type="button" class="btn btn-success"><i class="fa fa-thumbs-up "
                                aria-hidden="true"></i><span class="badge badge-light mr-1">${i.likes}</span>Like</button>
                        <button onClick="dislike('${i._id}')" id="${i._id}" type="button" class="btn btn-secondary"><i class="fa fa-thumbs-down"
                                aria-hidden="true"></i><span class="badge badge-light mr-1">${i.dislikes}</span>Dislike</button>
                    </div>
                </div>
            </div>`;
            });

            postDiv.innerHTML = postRow;
        },
        error: function () {
            alert("Server Error");
        },
    });
});

function like(id) {
    var bothElements = document.querySelectorAll(`[id='${id}']`);

    bothElements.forEach((i) => {
        i.disabled = true;
    });

    $.ajax({
        url: `${url}/post/addLike`,
        method: "post",
        data: { id: id },
        success: function () {
            console.log("send");
        },
        error: function () {
            alert("Server Error");
        },
    });
}

function dislike(id) {
    document.getElementById(`${id}`).disabled = true;
    $.ajax({
        url: `${url}/post/dislike`,
        method: "post",
        data: { id: id },
        success: function () {
            console.log("send");
        },
        error: function () {
            alert("Server Error");
        },
    });
}
