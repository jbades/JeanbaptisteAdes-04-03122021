// SHORTCUTS --------------------------------------------

// DOM Elements targetting
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const participationQtyInput = document.getElementById("quantity");
const locationInputs = document.querySelectorAll('[name="location"]');
const checkbox1Input = document.getElementById("checkbox1");
const modalFieldWrapper = document.getElementsByClassName("formData");
const submitBtn = document.querySelector(".btn-submit");
const formWrapper = document.querySelector('[name="reserve"]');

// Regex rules
const regexString = new RegExp(`^[a-zA-Z]+$`);



// SCRIPT -----------------------------------------

// launching modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close button modal event
closeBtn.addEventListener('click', closeModal);

// 'escape' key modal event
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    closeModal();
  };
});

// firstname field validation
firstNameInput.addEventListener('input', () => {
  hideError(firstNameInput.parentElement);
  if (!nameValidation(firstNameInput)) {
    showError(firstNameInput.parentElement);
  }
  modalValidation();
});

// lastname field validation
lastNameInput.addEventListener('input', () => {
  hideError(lastNameInput.parentElement);
  if (!nameValidation(lastNameInput)) {
    showError(lastNameInput.parentElement);
  }
  modalValidation();
});

// email field validation
emailInput.addEventListener('input', () => {
  hideError(emailInput.parentElement);
  if (!emailValidation(emailInput)) {
    showError(emailInput.parentElement);
  }
  modalValidation();
});

// birthdate field validation
birthdateInput.addEventListener('input', () => {
  hideError(birthdateInput.parentElement);
  if (!dateValidation(birthdateInput)) {
    showError(birthdateInput.parentElement);
  }
  modalValidation();
});

// participation number field validation
participationQtyInput.addEventListener('input', () => {
  hideError(participationQtyInput.parentElement);
  if (!participationQtyValidation(participationQtyInput)) {
    showError(participationQtyInput.parentElement);
  }
  modalValidation();
});

// city checkbox validation
locationInputs.forEach((input) => {
  input.addEventListener('input', () => {
    modalValidation();
  })
});

// agreement checkbox validation
  checkbox1Input.addEventListener('input', () => {
    modalValidation();
  });

// post-validation message
formWrapper.addEventListener("submit", (e) => {
  e.preventDefault();
  newDiv("tks__msg", "Merci ! Votre réservation a été reçue", formWrapper.parentElement);
  newButton("btn-signup", "button", "Fermer", formWrapper.parentElement);
  formWrapper.style.display = "none";
});


// FUNCTIONS ------------------------------------------

// burger menu
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// MODAL FUNCTIONS
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  formWrapper.style.display = "none";
}

// TEST FUNCTIONS
// check field is not empty
function isNotEmpty(val) {
  // console.log(typeof val !== 'undefined',val, val !=="");
  if (typeof val !== 'undefined' && val !=="") {
    return true;
  }
  return false;
}

//check field is not null
function isNotNull(val) {
    return(isNaN(val.valueOf()));
}

// check type 'string'
function isString(val) {
  if (regexString.test(val)) {
    return true;
  }
  return false;
}  

// check type 'number'
function isWholeNumber(val) {
  return(!isNaN(val) && val >= 0);
}  

// check field lentgh
function minTwoChar(val) {
  if (val.length < 2) {
    return false;
  }
  return true;
}

// check email format conformity
function emailFormatValidation(val) {
  // console.log(val.value)
  return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val.value));
}

// ERROR MESSAGE FUNCTIONS
// hiding error message
function hideError (el) {
  el.setAttribute("data-error-visible", "false");
}

// showing error message
function showError (el) {
  el.setAttribute("data-error-visible", "true");
}

// FIELD TESTING FUNCTIONS
// testing name field
function nameValidation(input) {
  return (isString(input.value) && minTwoChar(input.value) && isNotEmpty(input.value));
}

// testing email field
function emailValidation(input) {
  return (emailFormatValidation(input) && isNotEmpty(input.value));
}

// testing date field
function dateValidation(input) {
  // console.log(input.value);
  return (isNotNull(input.value) && isNotEmpty(input.value));
}

// testing participationQty field
function participationQtyValidation(input) {
  // console.log(isNotEmpty(input.val), isWholeNumber(input.value), input.value <=99);
  return (isNotEmpty(input.value) && isWholeNumber(input.value) && input.value <=99);
}

// testing city checkbox
function cityCheckboxValidation() {
  let isValid = false;
  locationInputs.forEach(input => {
    // console.log(input);
    if (input.checked == true) {
      isValid = true;
    }
  });
  // console.log("city", isValid);
  return isValid;
}

// testing city checkbox
function agreementCheckboxValidation() {
  let isValid = false;
  if (checkbox1Input.checked == true) {
    isValid = true;
  };
  return isValid;
}


// MODAL VALIDATION
// enabling validation button
function enableButton() {
  submitBtn.removeAttribute("disabled");
  document.querySelector(".btn-submit").classList.remove("btn-disabled");
}

// disabling validation button
function disableButton() {
  submitBtn.setAttribute("disabled", "");   
  document.querySelector(".btn-submit").classList.add("btn-disabled");
}

// modal validation
function modalValidation () {
  console.log(cityCheckboxValidation(), agreementCheckboxValidation());
  // console.log(nameValidation(firstNameInput), nameValidation(lastNameInput), emailFormatValidation(emailInput), dateValidation(birthdateInput), participationQtyValidation(participationQtyInput), cityCheckboxValidation());
    if (nameValidation(firstNameInput) && nameValidation(lastNameInput) && emailFormatValidation(emailInput) && dateValidation(birthdateInput) && participationQtyValidation(participationQtyInput) && cityCheckboxValidation() && agreementCheckboxValidation()) {
      enableButton();
  } else {
    // enableButton();
    disableButton();
  }
}

function newDiv(className, divText, parentNode) {
  const div = document.createElement("div");
  div.classList.add(className);
  const Text = document.createTextNode(divText);
  div.appendChild(Text);  
  parentNode.appendChild(div);
}

function newButton(className, btnType, divText, parentNode) {
  const div = document.createElement("button");
  div.classList.add(className);
  div.setAttribute("type", btnType);
  const Text = document.createTextNode(divText);
  div.appendChild(Text);  
  parentNode.appendChild(div);
}
