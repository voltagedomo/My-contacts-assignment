// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById("go-btn");
let menuEl = document.getElementById("menu");
let outputEl = document.getElementById("output");

let contacts = loadContacts();
displayContacts();

// Go Btn - Menu Listener
goBtnEl.addEventListener("click", goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === "display-all") {
    displayContacts();
  } else if (selection === "add") {
    addContact();
  } else if (selection === "remove") {
    removeContact();
  } else if (selection === "display-name") {
    displayByName();
  } else if (selection === "display-country") {
    displayByCountry();
  } else if (selection === "display-email") {
    displayByEmail();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    outputStr += getContactHTMLStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
}

function addContact() {
  let name = prompt("Enter the contact name:");
  let email = prompt("Enter the contact Email:");
  if (findByEmail(email) === "Email not found.") {
    let phone = prompt("Enter the contact phone number:");
    let country = prompt("Enter the country your contact resides in:");
    contacts.push(newContact(name, email, phone, country));
    saveContacts();
    displayContacts();
  } else {
    alert("That email is already in your contacts.");
    addContact();
  }
}

function removeContact() {
  let emailRemove = prompt("Enter Email of contact to remove:");
  let indexRemove;
  if (findByEmail(emailRemove) === "Email not found.") {
    indexRemove = "Email not found.";
  } else {
    indexRemove = JSON.parse(findByEmail(emailRemove));
    contacts.splice(indexRemove, 1);
    saveContacts();
    displayContacts();
  }
  if (indexRemove === "Email not found.") {
    alert("Email not found.");
  }
}

function displayByName() {
  let findName = prompt("Enter contact name:");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name.includes(findName) === true) {
      outputStr += getContactHTMLStr(contacts[i], i);
    }
    outputEl.innerHTML = outputStr;
  }
}

function displayByCountry() {
  let findCountry = prompt("Enter contact's country:");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].country.includes(findCountry) === true) {
      outputStr += getContactHTMLStr(contacts[i], i);
    }
    outputEl.innerHTML = outputStr;
  }
}

function displayByEmail() {
  let findEmail = prompt("Enter contact's Email:");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].email.includes(findEmail) === true) {
      outputStr += getContactHTMLStr(contacts[i], i);
    }
    outputEl.innerHTML = outputStr;
  }
}

// HELPER FUNCTIONS

// Return a new contact
function newContact(contactName, contactEmail, contactPhone, contactCountry) {
  return {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
    country: contactCountry,
  };
}

// Create html for given contact
function getContactHTMLStr(contacts, i) {
  return `
<div class="contactInfo">
  <p class="name">${i}: ${contacts.name}</p>
  <p class="email">${contacts.email}</p>
  <p class="phone">${contacts.phone} (${contacts.country})</p>
</div>
`;
}

// Save global contacts to local storage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Load contacts from local storage
function loadContacts() {
  let contactStr = localStorage.getItem("contacts");
  return JSON.parse(contactStr) ?? [];
}

function findByEmail(findEmail) {
  let emailFound = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].email.indexOf(findEmail) !== -1) {
      emailFound += i;
    }
  }
  if (emailFound === "") {
    console.log("No contact found with that email.");
    return "Email not found.";
  } else {
    return emailFound;
  }
}
