export function validateRegister() {
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  if (!username.value.trim()) {
    alert("Usernameni kiriting");
    return false;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.value.trim() || !emailRegex.test(email.value)) {
    alert("To'g'ri email kiriting");
    return false;
  }

  if (!password.value.trim() || password.value.length < 6) {
    alert("Parol 6 ta belgidan kam bo'lmasligi kerak");
    return false;
  }

  return true;
}
