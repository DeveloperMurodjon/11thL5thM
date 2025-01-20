import {
  validationBook,
  createCard,
  getData,
  addDeleteEventListeners,
} from "./functions.js";

// INPUT ELEMENTS
const bookForm = document.querySelector("#bookForm");
const nameBook = document.getElementById("nameInput");
const authorBook = document.querySelector(".authorInput");
const yearBook = document.querySelector(".yearInput");
const saveBook = document.querySelector("#saveBook");

// CARD ELEMENTS
const cardList = document.querySelector(".cardList");

// SUBMIT BOOK EVENT
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const isValid = validationBook(
    nameBook.value,
    authorBook.value,
    yearBook.value
  );
  if (!isValid) {
    return;
  }

  saveBook.setAttribute("disabled", true);
  const book = {
    title: nameBook.value,
    author: authorBook.value,
    year: yearBook.value,
  };
  fetch("https://trello.vimlc.uz/books", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Post jarayonida xatolik");
    })
    .then((data) => {
      let card = createCard(data.book);
      cardList.innerHTML += card;
      bookForm.reset();
      alert("Kitob muvaffaqiyatli qo'shildi!");
      addDeleteEventListeners();
    })
    .catch((error) => {
      alert(`Xatolik: ${error.message}`);
    })
    .finally(() => {
      saveBook.removeAttribute("disabled");
    });
});

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  getData("https://trello.vimlc.uz/books")
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          let card = createCard(item);
          cardList.innerHTML += card;
        });

        // DELETE
        addDeleteEventListeners();

        // SEARCH
        const searchByAuthorInput = document.getElementById("searchByAuthor");
        const searchByTitleInput = document.getElementById("searchByTitle");
        const authors = document.querySelectorAll(".author");
        const titles = document.querySelectorAll(".name");

        //SEARCH AUTHOR
        searchByAuthorInput.addEventListener("input", function () {
          let searchValue = this.value.toLowerCase();
          authors.forEach((author) => {
            if (author.textContent.toLowerCase().includes(searchValue)) {
              author.parentNode.style.display = "";
            } else {
              author.parentNode.style.display = "none";
            }
          });
        });

        //SEARCH TITLE
        searchByTitleInput.addEventListener("input", function () {
          let searchValue = this.value.toLowerCase();
          titles.forEach((title) => {
            if (title.textContent.toLowerCase().includes(searchValue)) {
              title.parentNode.style.display = "";
            } else {
              title.parentNode.style.display = "none";
            }
          });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
