const registerContainer = document.getElementById("registerContainer");
const loginContainer = document.getElementById("loginContainer");
const homeContainer = document.getElementById("homeContainer");

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const registerMessage = document.getElementById("registerMessage");
const loginMessage = document.getElementById("loginMessage");
const welcomeMsg = document.getElementById("welcomeMsg");

// load
window.onload = function () {
  showLogin();
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    showHome(currentUser.username);
  }
};

// show register screen
function showRegister() {
  registerContainer.style.display = "block";
  loginContainer.style.display = "none";
  homeContainer.style.display = "none";
}

// show login screen
function showLogin() {
  registerContainer.style.display = "none";
  loginContainer.style.display = "block";
  homeContainer.style.display = "none";
}

// Home screen
function showHome(username) {
  registerContainer.style.display = "none";
  loginContainer.style.display = "none";
  homeContainer.style.display = "block";
  welcomeMsg.textContent = `Welcome, ${username}`;
}

// Register new user
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  
  
  if (!username || !email || !password) {
    registerMessage.textContent = "All inputs are required!";
    registerMessage.style.color = "red";
    return;
  }

 
  let userExists = users.find(user => user.email === email);
  if (userExists) {
    registerMessage.textContent = "Email already exists. Try another one.";
    registerMessage.style.color = "red";
    return;
  }

  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  registerMessage.textContent = "✔ Registration successful!";
  registerMessage.style.color = "green";
  showHome(newUser.username);
});
// login
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    loginMessage.className = "error";
    loginMessage.textContent = "All inputs are required!";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let validUser = users.find(user => user.email === email && user.password === password);

  if (validUser) {
    localStorage.setItem("currentUser", JSON.stringify(validUser));
    showHome(validUser.username);
  } else {
    loginMessage.className = "error";
    loginMessage.textContent = "Invalid email or password!";
  }
});

// logout
function logout() {
  localStorage.removeItem("currentUser");
  showLogin();
  loginForm.reset();
}