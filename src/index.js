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

 