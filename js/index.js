function formatInput() {
    const inputValues = this.value.split(""); // Stores each character the user enters in an array
    const inputValuesFiltered = inputValues.filter(char => char !== " "); // Filters the spaces out of the inputValues array
    let inputFieldReformatted = ""; // String to replace the input field value with
    let counter = 0;
    
    for (let i = 0; i < inputValuesFiltered.length; i++) {
        if (counter === 4) {
            inputFieldReformatted += ` ${inputValuesFiltered[i]}`;
            counter = 1;
            continue;
        }
        
        inputFieldReformatted += inputValuesFiltered[i];
        counter++;
    }
    
    this.value = inputFieldReformatted;
}

function preventInput(e) {
    if (e.code === "Space") {
        e.preventDefault();
    }
}

function preventPaste(e) {
    e.preventDefault();
}

function checkForInvalidChars(userInput, validChars = "1234567890", containsInvalidChar = false) {
    for (let i = 0; i < userInput.length; i++) {
        for (let j = 0; j < validChars.length; j++) {
            if (userInput[i] === validChars[j]) {
                containsInvalidChar = false;
                break;
            } else {
                containsInvalidChar = true;
            }
        }

        if (containsInvalidChar === true) {
            return containsInvalidChar;
        }
    }
}

function validateForm(e) {
    e.preventDefault();

    // Cardholder name validation
    const nameInputField = document.querySelector("#form__name");
    const nameBorder = nameInputField.parentElement;
    const nameErrorMessage = nameBorder.nextElementSibling;

    const cardholderName = document.querySelector(".card__name");
    
    // If the name input field is blank
    if (!nameInputField.value) {
        nameBorder.classList.add("form__input-field-border--invalid");
        nameErrorMessage.classList.remove("form__error-message--hidden");
        cardholderName.textContent = "Jane Appleseed";
    } else {
        nameBorder.classList.remove("form__input-field-border--invalid");
        nameErrorMessage.classList.add("form__error-message--hidden");
        cardholderName.textContent = nameInputField.value;
    }
    
    // Card number validation
    const numberInputField = document.querySelector("#form__number");
    const numberBorder = numberInputField.parentElement;
    const numberErrorMessage1 = numberBorder.nextElementSibling; // Blank
    const numberErrorMessage2 = numberErrorMessage1.nextElementSibling; // Incorrect format
    const numberErrorMessage3 = numberErrorMessage2.nextElementSibling; // Input length
    
    // Display on card
    const cardNumber = document.querySelector(".card__number");
    cardNumber.textContent = numberInputField.value;
    
    // If the number input field is blank
    
    if (!cardNumberInputField.value) {
        numberErrorMessage1.classList.remove("form__error-message--hidden");
        cardNumber.textContent = "0000 0000 0000 0000";
    } else {
        numberErrorMessage1.classList.add("form__error-message--hidden");
    }
    
    // If the number input field contains non-integer characters
    const cardNumberWithoutSpaces = numberInputField.value.split("").filter(char => char !== " ").join("");
    const cardNumberIsInvalid = checkForInvalidChars(cardNumberWithoutSpaces);
    
    if (cardNumberIsInvalid) {
        numberErrorMessage2.classList.remove("form__error-message--hidden");
    } else {
        numberErrorMessage2.classList.add("form__error-message--hidden");
    }

    // If the number input field is not blank AND is too short
    if (cardNumberInputField.value && cardNumberInputField.value.length < 19) {
        numberErrorMessage3.classList.remove("form__error-message--hidden");
    } else {
        numberErrorMessage3.classList.add("form__error-message--hidden");
    }

    // Check if any error messages are being displayed
    // If invalid, set border to invalid state (red)
    let invalidBorder = false;
    const errorMessageArray = [numberErrorMessage1, numberErrorMessage2, numberErrorMessage3];
    
    errorMessageArray.forEach(element => {
        if (!element.classList.contains("form__error-message--hidden")) {
            invalidBorder = true;
        }
    });
    
    if (invalidBorder === true) {
        numberBorder.classList.add("form__input-field-border--invalid");
    } else {
        numberBorder.classList.remove("form__input-field-border--invalid");
    }

    // Expiry date validation
    const expMonthInputField = document.querySelector("#form__exp-month");
    const expMonthBorder = expMonthInputField.parentElement;
    const expYearInputField = document.querySelector("#form__exp-year");
    const expYearBorder = expYearInputField.parentElement;
    const expDateErrorMessages =  Array.from(document.querySelector(".form__exp-date-error-messages").children);
    let expMonthInvalidBorder = false;
    let expYearInvalidBorder = false;

    const cardExpDate = document.querySelector(".card__exp-date");
    let cardExpMonth = expMonthInputField.value;
    let cardExpYear = expYearInputField.value;
    
    // If the exp month/year input field is blank
    if (!expMonthInputField.value || !expYearInputField.value) {
        expDateErrorMessages[0].classList.remove("form__error-message--hidden");
    } else {
        expDateErrorMessages[0].classList.add("form__error-message--hidden");
    }
    
    if (!expMonthInputField.value) {
        expMonthInvalidBorder = true;
        cardExpMonth = "00";
    }
    
    if (!expYearInputField.value) {
        expYearInvalidBorder = true;
        cardExpYear = "00";
    }
    
    // If the exp month/year contains non-integer characters
    const expMonthIsInvalid = checkForInvalidChars(expMonthInputField.value);
    const expYearIsInvalid = checkForInvalidChars(expYearInputField.value);
    
    if (expMonthIsInvalid) {
        expMonthInvalidBorder = true;
    }
    
    if (expYearIsInvalid) {
        expYearInvalidBorder = true;
    }
    
    if (expMonthIsInvalid || expYearIsInvalid) {
        expDateErrorMessages[1].classList.remove("form__error-message--hidden");
    } else {
        expDateErrorMessages[1].classList.add("form__error-message--hidden");
    }
    
    // If the exp month/year is not blank AND is too short
    let userInputTooShort = false;
    
    if (expMonthInputField.value && expMonthInputField.value.length < 2) {
        userInputTooShort = true;
        expMonthInvalidBorder = true;
    }
    if (expYearInputField.value && expYearInputField.value.length < 2) {
        userInputTooShort = true;
        expYearInvalidBorder = true;
    }
    
    if (userInputTooShort === true) {
        expDateErrorMessages[2].classList.remove("form__error-message--hidden");
    } else {
        expDateErrorMessages[2].classList.add("form__error-message--hidden");
    }
    
    // Set border colour and display on card
    if (expMonthInvalidBorder === true) {
        expMonthBorder.classList.add("form__input-field-border--invalid");
    } else {
        expMonthBorder.classList.remove("form__input-field-border--invalid");
    }
    
    if (expYearInvalidBorder === true) {
        expYearBorder.classList.add("form__input-field-border--invalid");
    } else {
        expYearBorder.classList.remove("form__input-field-border--invalid");
    }
    
    cardExpDate.textContent = `${cardExpMonth}/${cardExpYear}`;

    // CVC validation
    const cvcInputField = document.querySelector("#form__cvc");
    const cvcBorder = cvcInputField.parentElement;
    const cvcErrorMessages = Array.from(document.querySelector(".form__cvc-error-messages").children);
    
    // Display on card
    const cardCvc = document.querySelector(".card__cvc");
    cardCvc.textContent = cvcInputField.value;
    
    // If the cvc input field is blank
    if (!cvcInputField.value) {
        cvcErrorMessages[0].classList.remove("form__error-message--hidden");
        cardCvc.textContent = "000";
    } else {
        cvcErrorMessages[0].classList.add("form__error-message--hidden");
    }
    
    // If the cvc contains invalid chars
    const cvcIsInvalid = checkForInvalidChars(cvcInputField.value);
    
    if (cvcIsInvalid) {
        cvcErrorMessages[1].classList.remove("form__error-message--hidden");

    } else {
        cvcErrorMessages[1].classList.add("form__error-message--hidden");
    }
    
    // If the cvc is not blank AND is too short
    if (cvcInputField.value && cvcInputField.value.length < 3) {
        cvcErrorMessages[2].classList.remove("form__error-message--hidden");
    } else {
        cvcErrorMessages[2].classList.add("form__error-message--hidden");
    }
    
    // Set border colour
    invalidBorder = false;
    
    cvcErrorMessages.forEach(element => {
        if (!element.classList.contains("form__error-message--hidden")) {
            invalidBorder = true;
        }
    });

    if (invalidBorder === true) {
        cvcBorder.classList.add("form__input-field-border--invalid");
    } else {
        cvcBorder.classList.remove("form__input-field-border--invalid");
    }

    // Display completed state
    let invalidField = false;

    if (!nameErrorMessage.classList.contains("form__error-message--hidden")) {
        invalidField = true;
    }

    errorMessageArray.forEach(element => {
        if (!element.classList.contains("form__error-message--hidden")) {
            invalidField = true;
        }
    });

    expDateErrorMessages.forEach(element => {
        if (!element.classList.contains("form__error-message--hidden")) {
            invalidField = true;
        }
    });

    cvcErrorMessages.forEach(element => {
        if (!element.classList.contains("form__error-message--hidden")) {
            invalidField = true;
        }
    });

    if (!invalidField) {
        this.classList.add("form--hidden");
        this.nextElementSibling.classList.remove("form__completed-state--hidden");
    }
}

const cardDetailsForm = document.querySelector("#form");
const cardNumberInputField = document.querySelector("#form__number");
const expMonthInputField = document.querySelector("#form__exp-month");
const expYearInputField = document.querySelector("#form__exp-year");
const cvcInputField = document.querySelector("#form__cvc");

cardNumberInputField.addEventListener("keydown", preventInput);
cardNumberInputField.addEventListener("paste", preventPaste);
cardNumberInputField.addEventListener("input", formatInput);

expMonthInputField.addEventListener("keydown", preventInput);
expMonthInputField.addEventListener("paste", preventPaste);

expYearInputField.addEventListener("keydown", preventInput);
expYearInputField.addEventListener("paste", preventPaste);

cvcInputField.addEventListener("keydown", preventInput);
cvcInputField.addEventListener("paste", preventPaste);

cardDetailsForm.addEventListener("submit", validateForm);
