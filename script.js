document.addEventListener("DOMContentLoaded", function () {
    loadBooks();
});

// Function to load books from local storage
function loadBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    books.forEach((book, index) => {
        let row = `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.borrowed ? "<span style='color:red;'>Borrowed</span>" : "<span style='color:green;'>Available</span>"}</td>
            <td>
                ${book.borrowed 
                    ? `<button class="return-btn" onclick="returnBook(${index})">Return</button>` 
                    : `<button class="borrow-btn" onclick="borrowBook(${index})">Borrow</button>`}
                <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
            </td>
        </tr>`;
        bookList.innerHTML += row;
    });
}

// Function to add a book
function addBook() {
    let title = document.getElementById("bookTitle").value.trim();
    let author = document.getElementById("bookAuthor").value.trim();
    let genre = document.getElementById("bookGenre").value.trim();

    if (title && author && genre) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.push({ title, author, genre, borrowed: false });
        localStorage.setItem("books", JSON.stringify(books));
        loadBooks();

        // Clear input fields
        document.getElementById("bookTitle").value = "";
        document.getElementById("bookAuthor").value = "";
        document.getElementById("bookGenre").value = "";
    } else {
        alert("Please fill in all fields.");
    }
}

// Function to borrow a book
function borrowBook(index) {
    let books = JSON.parse(localStorage.getItem("books"));
    books[index].borrowed = true;
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
}

// Function to return a book
function returnBook(index) {
    let books = JSON.parse(localStorage.getItem("books"));
    books[index].borrowed = false;
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
}

// Function to delete a book
function deleteBook(index) {
    let books = JSON.parse(localStorage.getItem("books"));
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
}

// Function to search books
function searchBooks() {
    let searchText = document.getElementById("searchBook").value.toLowerCase();
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    books.forEach((book, index) => {
        if (book.title.toLowerCase().includes(searchText)) {
            let row = `<tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.borrowed ? "<span style='color:red;'>Borrowed</span>" : "<span style='color:green;'>Available</span>"}</td>
                <td>
                    ${book.borrowed 
                        ? `<button class="return-btn" onclick="returnBook(${index})">Return</button>` 
                        : `<button class="borrow-btn" onclick="borrowBook(${index})">Borrow</button>`}
                    <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
                </td>
            </tr>`;
            bookList.innerHTML += row;
        }
    });
}
