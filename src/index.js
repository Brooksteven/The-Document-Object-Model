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

//  !!Registration Form Validation !!

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
    //This yet but this stops the form from continuing. If it returned true then the form continues.
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

// === Form processing ===
function processForm() {
    //localStorage.getItem("users") = Will get previously saved user data (that's stored as a string)
    //JSON.parse = Converts the user data aka string back into an object so we can work with it in JavaScript
    // || {} = If this is the users ("users") first time visiting the site and the user doesn't exist yet
    //it will transfer that users information aka data to an empty object {}
    //We do this to keep track of all the registered users on the site (locally in the browser, not the server which we'll learn more about that I'm sure in lecture).
    //.getItem needs a key to fetch
    const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
    //Here we are grabbing the entered username from the form and then convert it to lowercase using .toLowerCase
    //Then we are trimming aka removing the extra spaces before/after the username.
    //This makes since when I sometimes enter my username capitalized and sometimes lowercase because regardless (if it's in the code)
    //my name will be turned to lower case. This helps with preventing duplicates, so does trim with eliminating extra space which could register as a different username
    const newUsername = form.elements["username"].value.toLowerCase().trim();
  
    //If the newUsername is already stored then the error will be thrown and they will need to choose a different username.
    if (storedUsers[newUsername]) {
      errorDisplay.textContent = "This username is already taken.";
      form.elements["username"].focus();
      return false;
    }
  

//Once they choose a username that isn't already taken then it will come here and a new object representing the new users
//will be created. 
//The username is already cleaned up with lowercase and trim and now we are cleaning up email 
//We don't need to do this for password because password is case-sensitive and space sensitive.
    const newUser = {
      username: newUsername,
      email: form.elements["email"].value.toLowerCase().trim(),
      password: form.elements["password"].value,
    };
  
    //Here we are saving/storing the new user to storedUsers object that was created above.
    //the storedUsers object will then get stored into the localStorage under the key "users".
    //this information won't disappear when the page reloads unless we manually clear it.
    //JSON.stringify converts the object we have stored into storedUsers into and string when saving it.
    //.setItem saves data into localStorage and it has to have a key ("users") and value that can convert into a string or it won't save. 
    //localStorage can only store stings
    storedUsers[newUsername] = newUser;
    localStorage.setItem("users", JSON.stringify(storedUsers));
  
    // Requirement: Create element using createElement (5%)
    //Here we are adding a success message to the form so the user can have feedback that the task was a success.
    //with this code alone the text wont show. I want it to appear at the bottom when we click submit. This will happen by the addEventListener we created,
    //and then the validate() function we created will run and then call processForm() and inside processForm() this code runs.
    let successMsg = document.createElement("p");
    successMsg.textContent = "Registration successful!";
    successMsg.style.color = "green";
    
    // Requirement: appendChild to DOM (5%)
    //Here is where we add the success message into the HTML
    //.appendChild adds it to the bottom, so when it is triggered it will show at the bottom.
    form.appendChild(successMsg);
  
    // Requirement: DocumentFragment (2%)
    //Here we are creating the Document Fragment which is the container we will be holding our DOM node <p>, but we haven't appended it yet so it's not yet on the DOM.
    //the Document Fragment is just a holding space for the nodes before putting them into the actual DOM.
    let frag = document.createDocumentFragment();
    //Here is the node that we are creating for the Document Fragment to hold, but it still hasn't been added to the Document Fragment here. We will need to append it into the Document Fragment first
    //and then we can append it to the form
    let thanksMsg = document.createElement("p");
    thanksMsg.textContent = "Thank you for registering!";
    //Here is where we actually put everything we created inside the DocFrag, in this case its the <p>.
    frag.appendChild(thanksMsg);
    //Here is where we add everything we created and put inside the DocFrag to the form. It will append to the bottom. 
    //.appendChild always adds to the bottom.
    form.appendChild(frag);
  