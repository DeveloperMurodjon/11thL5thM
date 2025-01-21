import { validateRegister } from "./functions.js";

const registerForm = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const show = document.getElementById("show");

registerForm &&
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const isValide = validateRegister(username, email, password);
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
        if (response.status == 400) {
          alert("Email yoki username noto'g'ri");
          throw new Error("Email yoki username noto'g'ri");
        } else if (!response.ok) {
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
        alert(error.message);
      });
  });

show &&
  show.addEventListener("click", function () {
    if (password.type == "password") {
      password.type = "text";
      show.innerHTML = `<img src="../images/hidePassword.png" alt="show password button" />`;
    } else {
      password.type = "password";
      show.innerHTML = `<img src="../images/showPassword.png" alt="show password button" />`;
    }
  });
