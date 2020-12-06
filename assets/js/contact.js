const ok = document.querySelector("#ok");
const form = document.querySelector("#contactForm");
const name = document.querySelector("#name");
const nameError = document.querySelector("#inputErrorName");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#inputErrorSubject");
const email = document.querySelector("#email");
const emailError = document.querySelector("#inputErrorEmail");
const message = document.querySelector("#message");
const messageError = document.querySelector("#inputErrorMessage");


// validation of form input
function validateForm() {

    check(name, nameError);
    validate(subject, subjectError, 10);
    emailValidate(email, emailError);
    validate(message, messageError, 25);

}

function check(value, error) {
    //check if name is inputed on form
    const textValue = (value).value;
    if (checkExsist(textValue)) {
        hide(error);
        // console.log(textValue);
        return true;
    } else {
        show(error);
    }
}

function validate(value, error, count) {
    //validate subject on form
    const textValue = (value).value;
    if (checkInputLength(textValue, (count))) {
        hide(error);
        // console.log(textValue);
        return true;
    } else {
        show(error);
    }
}

function emailValidate(value, error) {
    //validate email on form
    const textValue = (value).value;
    if (validateEmail(textValue)) {
        hide(error);
        // console.log(textValue);
        return true;
    } else {
        show(error);
    }
}

//check if input meet expected lenght
function checkInputLength(inputValue, lengthToCheck) {
    if (inputValue.trim().length >= lengthToCheck) {
        return true;
    }
    return false;
}

// checks if there is input
function checkExsist(inputToCheck) {
    if (inputToCheck) {
        return true;
    }
}

// email validation
function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

// show text on the page
function show(value) {
    (value).classList.add("show");
    (value).classList.remove("hide");
}

// show hide text on the page
function hide(value) {
    (value).classList.remove("show");
    (value).classList.add("hide");
}

// checks if function meets all the requirements, if true, shows greeting.
function checkForm() {
    if (check(name, nameError) && validate(subject, subjectError, 10) && emailValidate(email, emailError) && validate(message, messageError, 25)) {
        // console.log("Validation OK");
        show(ok);
        return true;
    } else {
        // console.log("Some fields doesnt meet the requirements");
        hide(ok);
        event.preventDefault();
    }
}

form.addEventListener("submit", validateForm);
form.addEventListener("submit", checkForm);


function formbtn() {
    let btn = document.querySelector(".btn");

    btn.addEventListener("click", click);

    function click() {
        validateForm();
        checkForm();
        const ok = document.querySelector("#ok");
        ok.innerHTML = `Thank you for the message`;
    }

}

formbtn();