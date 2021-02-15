const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const form = document.querySelector('#form');
const warning = document.querySelector('#warning');

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

    var formData = new FormData();
    formData.append('email', emailEl.value);
    formData.append('password', passwordEl.value);

    console.log(Object.fromEntries(formData))

    $(document).ready(function() {
            $.ajax({
                url: 'http://localhost:8080/login',
                method: 'post',
                processData: false,
                contentType: false,
                data: formData,
                enctype: 'multipart/form-data',
                success: function(res) {
                    if (res.msg == 'email') {
                        warning.innerHTML = `<div class="alert alert-dismissible alert-danger">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <strong>User Doesn't Exists</strong>
                    </div>`

                    } else if (res.msg == 'password') {
                        warning.innerHTML = `<div class="alert alert-dismissible alert-danger">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <strong>Password Incorrect</strong>
                    </div>`
                    } else {
                        form.submit();
                        localStorage.setItem("auth-token", res.token);
                    }
                },
                error: function() {
                    alert('server error occured')
                }
            });
        })
        /*
        xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/login');
        xhr.send(formData);
        xhr.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
                const response = JSON.parse(this.responseText);
                if (response == 'email') {
                    warning.innerHTML = `<div class="alert alert-dismissible alert-danger">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>User Doesn't Exists</strong>
                        </div>`
                } else if (response == 'password') {
                    warning.innerHTML = `<div class="alert alert-dismissible alert-danger">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Password Incorrect !</strong>
                        </div>`

                } else {
                    warning.innerHTML = `<div class="alert alert-dismissible alert-primary">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Welcome !</strong>
                        </div>`
                }
            }
        };
        */
}