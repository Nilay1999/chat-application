var input = document.getElementById("upload");
var infoArea = document.getElementById("upload-label");
var desc = document.getElementById("description");
const form = document.getElementById("post-form");
const alert = document.getElementById("alert-msg");

var file = $("#upload")[0];
var formData = new FormData();

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#imageResult").attr("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $("#upload").on("change", function () {
        readURL(input);
    });
});

input.addEventListener("change", showFileName);
function showFileName(event) {
    var input = event.srcElement;
    var fileName = input.files[0].name;
    infoArea.textContent = "File name: " + fileName;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    formData.append("desc", desc.value); // the text data
    formData.append("image", file.files[0]);
    formData.append("id", localStorage.getItem("id"));

    $.ajax({
        url: `${url}/post/makePost`,
        method: "post",
        processData: false,
        contentType: false,
        data: formData,
        enctype: "multipart/form-data",
        success: function (res) {
            alert("Successfully Posted");
        },
        error: function () {
            alert("Server Error");
        },
    });
});

$("#logout").on("click", function () {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    window.location = "login.html";
});
