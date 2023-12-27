const form = document.querySelector("[data-form]");
const inputEmail = document.getElementById("email");
const emailError = document.getElementById("emailError");

const localStorageEmail = JSON.parse(localStorage.getItem("email")) || [];

function updateStorage() {
  localStorage.setItem("email", JSON.stringify(localStorageEmail));
}

inputEmail.addEventListener("invalid", (e) => {
  e.preventDefault();
  displayError(inputEmail);
});

form.addEventListener("submit", (e) => {
  const emails = {
    email: e.target.elements["email"].value,
  };

  if (!form.checkValidity()) {
    e.preventDefault();
    displayError(inputEmail);
  } else {
    e.preventDefault();
    window.location.href = `./success.html#${encodeURIComponent(emails.email)}`;
  }

  localStorageEmail.push(emails);
  updateStorage();
});

function displayError(inputField) {
  const validity = inputField.validity;

  if (validity.valueMissing) {
    inputField.setCustomValidity("This field is required");
    emailError.textContent = "This field is required";
  } else if (validity.typeMismatch) {
    inputField.setCustomValidity("Please enter a valid email address");
    emailError.textContent = "Please enter a valid email address";
  } else {
    inputField.setCustomValidity("");
    emailError.textContent = "";
  }
}

