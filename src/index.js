//All Resources will be in the README.md

//  Cached elements //
// Requirement: Cache at least one element using getElementById (5%)
const form = document.getElementById("registration");

// Requirement: Cache at least one element using querySelector (5%)
//this will allow error messages to be displayed
const errorDisplay = document.querySelector("#errorDisplay");

// Cache login elements 
const loginForm = document.getElementById("login");
const loginUsername = loginForm.elements["username"];
const loginPassword = loginForm.elements["password"];
const rememberMe = loginForm.elements["persist"];

// === Registration Form Validation ===

//Here are the Event Listeners, which listen for when the user submits form and triggers validation functions.
//(Ignore, personal Note: Without Event Listeners nothing would happen when users submit forms. Nothing would be validated.)
// Requirement: Register event listener (1 of 2)
form.addEventListener("submit", validate);

// Requirement: Register event listener (2 of 2)
loginForm.addEventListener("submit", validateLogin);

// Validate registration form
//(Ignore,  personal Note: We love event.preventDefault because without it the form would refresh the page before validation happens)
function validate(event) {
  event.preventDefault(); // Requirement: DOM event-based validation (5%)

  // Requirement: Modify textContent in response to interaction using textContent(10%)
  //This checks if the firstChild is a text node and clears it.
  //If the first child of the form is a text node (which it is b/c 3 is text node), clear its content by setting it to an
  //empty string. 
  //source: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  if (form.firstChild.nodeType === 3) { // Example of parent-child-sibling relationship (5%)
    form.firstChild.textContent = "";
  }

  if (form.elements["username"].value === "") {
    //this is out error message if the string is empty
    errorDisplay.textContent = "Please provide a username.";
    //this makes the textContent message show up w/o it "Please provide a username won't show"
    errorDisplay.style.display = "block"; // Requirement: Modify style property using style(5%)
    //this focuses the cursor back to this input field
    form.elements["username"].focus();
    return false;
  }

  // Example: Modifying an attribute dynamically (3%)
  //Here we are dynamically changing the placeholder, but only after validation attempt. Before it will just say "Username" from the placeholder I set in the html.
  form.elements["username"].setAttribute("placeholder", "Enter your username here!");

  // Continue validations - Email
  if (form.elements["email"].value === "") {
    errorDisplay.textContent = "Please provide an email.";
    form.elements["email"].focus();
    return false;
  }

  //Ensuring email input will have @ and .
  let emailCheck = form.elements["email"].value;
  let atpos = emailCheck.indexOf("@");
  let dotpos = emailCheck.lastIndexOf(".");
  if (atpos < 1 || dotpos - atpos < 2) {
    errorDisplay.textContent = "Please enter a valid e-mail address.";
    form.elements["email"].focus();
    return false;
  }

  // Continue validation - Password 
  //
  if (form.elements["password"].value.length < 12) {
    errorDisplay.textContent = "Password must be at least 12 characters.";
    form.elements["password"].focus();
    return false;
  }

  //Ensuring theres at least one number in the password
  //if anything less than 0 is returned then the error will be thrown
  if (form.elements["password"].value.search(/[0-9]/) < 0) {
    errorDisplay.textContent = "Password must contain a number.";
    form.elements["password"].focus();
    return false;
  }

  //Ensuring passwords for password and passwordCheck match. If != then the error message will be thrown.
  if (form.elements["password"].value != form.elements["passwordCheck"].value) {
    errorDisplay.textContent = "Passwords do not match.";
    form.elements["passwordCheck"].focus();
    return false;
  }

  //if terms aren't checked then error is thrown
  if (form.elements["terms"].checked == false) {
    errorDisplay.textContent = "You must agree to the terms.";
    form.elements["terms"].focus();
    return false;
  }

  // Proceed to form processing
  processForm();
  return true;
}

