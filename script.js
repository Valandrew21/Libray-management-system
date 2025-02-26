document.addEventListener("DOMContentLoaded", function () {
    loadBooks();
});

// Function to add books
function addBook() {
    let bookTitle = document.getElementById("bookTitle").value;
    let bookAuthor = document.getElementById("bookAuthor").value;
    let bookGenre = document.getElementById("bookGenre").value;
    let userRole = document.getElementById("userRole").value; // Get user role (Admin or Student)

    if (!bookTitle || !bookAuthor || !bookGenre) {
        showNotification("⚠️ Please fill all fields!", "error");
        return;
    }

    let books = JSON.parse(localStorage.getItem("books")) || [];

    // Add book with user role
    books.push({
        title: bookTitle,
        author: bookAuthor,
        genre: bookGenre,
        reserved: false,
        addedBy: userRole
    });

    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
    showNotification("📚 Book added successfully!", "success");
}

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
            <td>${book.reserved ? "Reserved" : "Available"}</td>
            <td>${book.addedBy}</td>
            <td>
                <button onclick="reserveBook(${index})">Reserve</button>
                <button class="delete-btn" onclick="deleteBook(${index})">🗑 Delete</button>
            </td>
        </tr>`;
        bookList.innerHTML += row;
    });
}

// Function to delete a book (Admin only)
function deleteBook(index) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
    showNotification("🗑 Book deleted!", "error");
}

// Function to reserve a book
function reserveBook(index) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    if (!books[index].reserved) {
        books[index].reserved = true;
        localStorage.setItem("books", JSON.stringify(books));
        loadBooks();
        showNotification("📌 Book reserved successfully!", "success");
    } else {
        showNotification("⚠️ This book is already reserved.", "error");
    }
}

// Function to show notifications
function showNotification(message, type) {
    let notification = document.getElementById("notification");
    notification.innerText = message;
    notification.className = `notification ${type}`;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
                  }
    
