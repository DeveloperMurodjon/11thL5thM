import { validateRegister } from "./functions.js";

const form = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");
const show = document.getElementById("show");

show &&
  show.addEventListener("click", function () {
    if (password.type === "password") {
      password.type = "text";
      show.textContent = "hide";
    } else {
      password.type = "password";
      show.textContent = "show";
    }
  });

registerBtn &&
  registerBtn.addEventListener("click", function (e) {
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
          throw new Error("Email yoki username noto'g'ri");
        }
        if (!response.ok) {
          throw new Error("Xatolik yuz berdi!");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "User registered successfully!") {
          location.assign(`${window.location.origin}/pages/login.html`);
        }
      })
      .catch((error) => {
        console.error(error.message);
        alert("Server bilan bog'lanishda muammo yuz berdi!");
      });
  });
