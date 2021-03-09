const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const form = document.querySelector('#form');
const warning = document.querySelector('#warning');


var socket = io('http://localhost:3000', { transport: ['websocket'] });


const isRequired = value => value === '' ? false : true;

const showError = (input, message) => {

    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('span');
    error.textContent = message;
};

const showSuccess = (input) => {

    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('span');
    error.textContent = '';
}

const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function(e) {
    switch (e.target.id) {
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
    }
}))

form.addEventListener('submit', function(e) {

    e.preventDefault();

    let isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = isEmailValid &&
        isPasswordValid;

    if (isFormValid) {
        ajaxCall();
    }
})

const ajaxCall = () => {

    var user = {
        email: $("#email").val(),
        password: $("#password").val(),
    }

    $(document).ready(function() {
        $.ajax({
            url: 'http://localhost:3000/login',
            method: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(user),
            statusCode: {
                404: function(response) {
                    $('#warning').html(response.responseText);
                },
                405: function(response) {
                    $('#warning').html(response.responseText);
                },
                500: function() {
                    alert("Server Error")
                }
            },
            success: function(res) {
                localStorage.setItem("x-auth-token", res.token);
                localStorage.setItem("id", res.user.id);
                localStorage.setItem("email", res.user.email);
                location.href = "home.html"
            },
        });
    })
}