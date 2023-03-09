const cardCVC = document.querySelector(".cvc span");
const cardNumber = document.querySelector(".card-Number");
const cardName = document.querySelector(".cardholder-name");
const cardExpDate = document.querySelector(".exp-date");

const form = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputNumber = document.querySelector("#card-number");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const inputCVC = document.querySelector("#cvc");

const infoError = document.querySelectorAll(".info-error");
const complete = document.querySelector(".complete");

console.log(infoError);

const showError = (input, arrInfoError, message) => {
  input.classList.add("input-error");
  infoError[arrInfoError].classList.add("d-block");
  infoError[arrInfoError].textContent = message;
};

const hideError = (input, arrInfoError) => {
  input.classList.remove("input-error");
  infoError[arrInfoError].classList.remove("d-block");
};

let inputNameValue;
let inputNumberValue;
let inputMonthValue = "00";
let inputYearValue = "00";
let inputCVCValue;

const validateInput = (input, arrInfoError, wordLength) => {
  if (!wordLength) {
    if (!input.value) {
      showError(input, arrInfoError, "Can’t be blank");
    } else {
      hideError(input, arrInfoError);
      inputNameValue = input.value;
    }
  } else {
    if (!input.value) {
      showError(input, arrInfoError, "Can’t be blank");
    } else if (!/^\d+(\s\d+)*$/.test(input.value)) {
      showError(input, arrInfoError, "Wrong format, numbers only");
    } else if (input.value.length < wordLength) {
      if (wordLength > 3) {
        showError(input, arrInfoError, "Card number must be 16 numbers");
      } else {
        showError(input, arrInfoError, `must be ${wordLength} numbers`);
      }
    } else {
      hideError(input, arrInfoError);

      switch (input) {
        case inputNumber:
          inputNumberValue = input.value;
          break;
        case inputMonth:
          inputMonthValue = input.value;
          break;
        case inputYear:
          inputYearValue = input.value;
          break;
        case inputCVC:
          inputCVCValue = input.value;
          break;
      }
    }
  }
};

inputName.addEventListener("input", (e) => {
  e.preventDefault();

  inputNameValue = e.target.value;
  cardName.textContent = inputNameValue;
});

inputNumber.addEventListener("input", (e) => {
  e.preventDefault();

  let formatText = e.target.value;
  formatText = formatText.substring(0, 19);
  formatText = formatText
    .replace(/\s/g, "")
    .replace(new RegExp(`(.{${4}})`, "g"), "$1 ")
    .trim();

  e.target.value = formatText;

  inputNumberValue = e.target.value;
  cardNumber.textContent = inputNumberValue;
});

const deleteSpace = (input) => {
  if (/\s/.test(input.value)) {
    let formatText = input.value.replace(/\s/g, "");

    input.value = formatText;
  }
};

inputMonth.addEventListener("input", (e) => {
  e.preventDefault();

  deleteSpace(inputMonth);
  inputMonthValue = e.target.value;
  cardExpDate.textContent = inputMonthValue + "/" + inputYearValue;
});

inputYear.addEventListener("input", (e) => {
  e.preventDefault();

  deleteSpace(inputYear);
  inputYearValue = e.target.value;
  cardExpDate.textContent = inputMonthValue + "/" + inputYearValue;
});

inputCVC.addEventListener("input", (e) => {
  e.preventDefault();

  deleteSpace(inputCVC);
  inputCVCValue = e.target.value;
  cardCVC.textContent = inputCVCValue;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputNameValue = "";
  inputNumberValue = "";
  inputMonthValue = "00";
  inputYearValue = "00";
  inputCVCValue = "";

  validateInput(inputName, 0);
  validateInput(inputNumber, 1, 19);
  validateInput(inputMonth, 2, 2);
  validateInput(inputYear, 2, 2);
  validateInput(inputCVC, 3, 3);

  if (
    inputNameValue &&
    inputNumberValue &&
    inputMonthValue &&
    inputYearValue &&
    inputCVCValue
  ) {
    cardName.textContent = inputNameValue;
    cardNumber.textContent = inputNumberValue;
    cardExpDate.textContent = inputMonthValue + "/" + inputYearValue;
    cardCVC.textContent = inputCVCValue;

    form.classList.add("d-none");
    complete.classList.add("d-block");
  }
});

complete.addEventListener("click", () => {
  location.reload(true);
});