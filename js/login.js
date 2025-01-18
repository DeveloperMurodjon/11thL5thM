const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");

form &&
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = {
      username: username.value,
      password: password.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status === 401) {
          alert("Email yoki parol noto'g'ri");
        } else if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        if (data && data.accessToken) {
          sessionStorage.setItem("accessToken", data.accessToken);
          alert("Login muvaffaqiyatli amalga oshirildi");
          location.assign(`${window.location.origin}/index.html`);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  });
