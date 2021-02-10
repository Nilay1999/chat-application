const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#pass1');
const confirmPasswordEl = document.querySelector('#pass2');
const phoneEl = document.querySelector('#phone');
const fnameEl = document.querySelector('#fname');
const lnameEl = document.querySelector('#lname');
const img = document.querySelector('#images');

const warning = document.querySelector('#warning');

const form = document.querySelector('#form');

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])");
    return re.test(password);
};

const isPhoneValid = (phone) => {
    const re = new RegExp("(0/91)?[7-9][0-9]{9}");
    return re.test(phone);
};

const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 15;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const CheckFullName = () => {
    let valid = false;

    const min = 3,
        max = 15;
    const fname = fnameEl.value.trim();

    if (!isRequired(fname)) {
        showError(fnameEl, 'First name cannot be blank.');
    } else if (!isBetween(fname.length, min, max)) {
        showError(fnameEl, `First name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(fnameEl);
        valid = true;
    }
    return valid;
}


const CheckLastName = () => {
    let valid = false;

    const min = 3,
        max = 15;
    const lname = lnameEl.value.trim();

    if (!isRequired(lname)) {
        showError(lnameEl, 'last name cannot be blank.');
    } else if (!isBetween(lname.length, min, max)) {
        showError(lnameEl, `last name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lnameEl);
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};


const checkPhone = () => {
    let valid = false;
    const phone = phoneEl.value.trim();
    if (!isRequired(phone)) {
        showError(phoneEl, 'Phone no. cannot be blank.');
    } else if (!isPhoneValid(phone)) {
        showError(phoneEl, 'Phone no. is not valid.')
    } else {
        showSuccess(phoneEl);
        valid = true;
    }
    return valid;
};


const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password has atleast 1 number and 1 upper case (8 letter long)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;

    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, ' Enter password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

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


form.addEventListener('submit', function(e) {

    e.preventDefault();


    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isFirstNameValid = CheckFullName(),
        isLastNameValid = CheckLastName(),
        isConfirmPasswordValid = checkConfirmPassword(),
        isPhoneNumberValid = checkPhone();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isFirstNameValid &&
        isLastNameValid &&
        isPasswordValid &&
        isPhoneNumberValid &&
        isConfirmPasswordValid;


    if (isFormValid) {
        ajaxCall();
    }
});

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
        case 'username':
            checkUsername();
            break;
        case 'fname':
            CheckFullName();
            break;
        case 'lname':
            CheckLastName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'pass1':
            checkPassword();
            break;
        case 'pass2':
            checkConfirmPassword();
            break;
        case 'phone':
            checkPhone();
            break;
    }
}));

const ajaxCall = () => {
    let username = usernameEl.value;
    let email = emailEl.value;
    let password = passwordEl.value;
    let phone = phoneEl.value;
    let fname = fnameEl.value;
    let lname = lnameEl.value;
    let imgjson = img.value;

    const data = {
        "userName": username,
        "password": password,
        "email": email,
        "firstName": fname,
        "lastName": lname,
        "images": imgjson,
        "phone": phone
    }

    console.log(JSON.stringify(data));
    $(document).ready(function() {
        $.ajax({
            url: 'http://localhost:8080/register',
            method: 'post',
            dataType: 'json',
            data: data,
            success: function(res) {
                if(res.msg == 'success'){
                    warning.innerHTML = `<div class="alert alert-dismissible alert-success">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <strong>Success</strong>
                    </div>`
                }
                else if(res.msg == 'user')
                {
                    warning.innerHTML = `<div class="alert alert-dismissible alert-danger">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <strong>Error</strong>
                    </div>`
                }
            },
            error: function() {
                alert('server error occured')
            }
        });
    })
}