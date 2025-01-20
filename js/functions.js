//Register
function validateRegister() {
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

//Main page

function createCard(book) {
  return `
      <div class="card">
            <h2 class="name">Name: ${book.title}</h2>
            <h3 class="author">Author: ${book.author}</h3>
            <p class="year">Written: ${book.year}</p>
            <div class="extencions">
              <button class="edit-btn">
                <img src="./images/editBtn.png" alt="edit book button" />
              </button>
              <button data-id="${book.id}" class="delete-btn">
                <img src="./images/deleteBtn.png" alt="delete book button" />
              </button>
            </div>
          </div>
    `;
}

//getData
async function getData(url) {
  try {
    let response = await fetch(url);
    if (response.status == 200) {
      return await response.json();
    } else {
      throw new Error("API bilan bog'liq xatolik");
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

//MAIN INPUT VALIDATION
function validationBook(nameBook, authorBook, yearBook) {
  if (!nameBook.trim() || !authorBook.trim() || !yearBook) {
    alert("Barcha maydonlarni to'ldiring");
    return false;
  }

  if (Number(yearBook) >= 2025) {
    alert("Yilni to'g'ri kiriting!");

    return false;
  }
  return true;
}

// DELETE
function addDeleteEventListeners() {
  let delBtns = document.querySelectorAll(".delete-btn");
  delBtns.forEach((delBtn) => {
    delBtn.addEventListener("click", function () {
      let confirmDel = confirm("Rostdan ham o'chirmoqchimisiz?");
      let elementId = this.getAttribute("data-id");
      if (confirmDel && elementId) {
        fetch(`https://trello.vimlc.uz/books/${elementId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message == "Book deleted successfully") {
              this.parentNode.parentNode.remove();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  });
}

export { validationBook, createCard, getData, addDeleteEventListeners };
