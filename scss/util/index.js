function invalid(inputField) {
    inputField.classList.add("form__input-field--invalid");

    const errorMessage = inputField.nextElementSibling;
    errorMessage.classList.remove("form__error-message--hidden");

    const errorIcon = errorMessage.nextElementSibling;
    errorIcon.classList.remove("form__error-icon--hidden");

    const successMessage = document.querySelector("#form__success-message");
    successMessage.classList.add("form__success-message--hidden");
}

function valid(inputField) {
    inputField.classList.remove("form__input-field--invalid");

    const errorMessage = inputField.nextElementSibling;
    errorMessage.classList.add("form__error-message--hidden");

    const errorIcon = errorMessage.nextElementSibling;
    errorIcon.classList.add("form__error-icon--hidden");
}

function validateForm(e) {
    e.preventDefault();
    
    const firstNameInput = document.querySelector("#form__first-name");
    if (!firstNameInput.value) {
        invalid(firstNameInput);
    } else {
        valid(firstNameInput);
    }
    
    const lastNameInput = document.querySelector("#form__last-name");
    if (!lastNameInput.value) {
        invalid(lastNameInput);
    } else {
        valid(lastNameInput);
    }
    
    const emailInput = document.querySelector("#form__email");
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailInput.value.match(validEmail)) {
        invalid(emailInput);
    } else {
        valid(emailInput);
    }
    
    const passwordInput = document.querySelector("#form__password");
    if (!passwordInput.value) {
        invalid(passwordInput);
    } else {
        valid(passwordInput);
    }
    
    const errorMessages = Array.from(document.querySelectorAll(".form__error-message"));
    for (let i = 0; i < errorMessages.length; i++) {
        if (!errorMessages[i].classList.contains("form__error-message--hidden")) {
            return;
        }
    }
    
    const successMessage = document.querySelector("#form__success-message");
    successMessage.classList.remove("form__success-message--hidden");
    
    const inputFields = Array.from(document.querySelectorAll("input"));
    inputFields.forEach((inputField) => {
        inputField.value = "";
        inputField.blur();
    });
    
}

const formElement = document.querySelector("#form");
formElement.addEventListener("submit", validateForm);

function checkContentHeight() {
    // Prevents overriding of mobile styles
    const breakpoint = window.matchMedia("(min-width: 1440px)");
    if (!breakpoint.matches) {
        return;
    }

    const formContainer = document.querySelector("#form-container");
    const textBlock = document.querySelector("#text-block");
    const mainElement = document.querySelector("main");
    
    // Enables scrolling if height of content is greater than height of viewport
    if (formContainer.clientHeight > window.innerHeight || textBlock.clientHeight > window.innerHeight) {
        mainElement.style.height = "auto";
        mainElement.style.padding = "80px";
    } else {
        mainElement.style.height = null;
        mainElement.style.padding = null;
    }
}

checkContentHeight();
window.addEventListener("resize", checkContentHeight);
