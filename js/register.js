import { validateRegister } from "./functioins.js";

const form = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

form &&
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isValide = validateRegister();
    if (!isValide) return;

    const user = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status === 400) {
          alert("Email yoki username noto'g'ri");
        } else if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        if (data && data.message === "User registered successfully!") {
          location.assign(`${window.location.origin}/pages/login.html`);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  });
