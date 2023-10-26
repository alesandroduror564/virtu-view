/*
 * Filename: complexCode.js
 * Description: This code demonstrates a complex application for managing a library system.
 */

// Class for representing a book 
class Book {
  constructor(title, author, publicationYear) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
  }
}

// Class for representing a library
class Library {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(book) {
    const index = this.books.findIndex((b) => b.title === book.title && b.author === book.author);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  searchBooksByAuthor(author) {
    return this.books.filter((book) => book.author === author);
  }

  searchBooksByTitle(title) {
    return this.books.filter((book) => book.title === title);
  }

  listBooks() {
    console.log(`Books in ${this.name} library:\n`);
    this.books.forEach((book) => {
      console.log(`Title: ${book.title}`);
      console.log(`Author: ${book.author}`);
      console.log(`Publication Year: ${book.publicationYear}\n`);
    });
  }
}

// Create a library instance
const myLibrary = new Library("My Library", "New York");

// Create some books
const book1 = new Book("JavaScript: The Good Parts", "Douglas Crockford", 2008);
const book2 = new Book("Clean Code: A Handbook of Agile Software Craftsmanship", "Robert C. Martin", 2008);
const book3 = new Book("Design Patterns: Elements of Reusable Object-Oriented Software", "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides", 1994);

// Add books to the library
myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);

// List all books in the library
myLibrary.listBooks();

// Search for books by author
const booksByAuthor = myLibrary.searchBooksByAuthor("Robert C. Martin");
console.log(`Books by Robert C. Martin:\n`);
booksByAuthor.forEach((book) => {
  console.log(`Title: ${book.title}`);
  console.log(`Author: ${book.author}`);
  console.log(`Publication Year: ${book.publicationYear}\n`);
});

// Search for books by title
const booksByTitle = myLibrary.searchBooksByTitle("JavaScript: The Good Parts");
console.log(`Books with title "JavaScript: The Good Parts":\n`);
booksByTitle.forEach((book) => {
  console.log(`Title: ${book.title}`);
  console.log(`Author: ${book.author}`);
  console.log(`Publication Year: ${book.publicationYear}\n`);
});

// Remove a book from the library
myLibrary.removeBook(book1);

// List books after removing one
myLibrary.listBooks();
// ...
// Continue with more library management operations
// ...
// Over 200 lines of code...
// ...