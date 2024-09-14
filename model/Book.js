import checkIsbn from "../utils/checkIsbn.js";

export default class Book {
  constructor(isbn, title, publication_date, pages) {
    this.isbn = isbn;
    this.title = title;
    this.publication_date = publication_date || null;
    this.pages = +pages;
  }

  isValid() {
    if (!this.isbn && typeof this.isbn !== "string" && !checkIsbn(this.isbn)) {
      return false;
    }

    if (!this.title && typeof this.title !== "string") {
      return false;
    }

    if (
      !this.publication_date &&
      (!(this.publication_date instanceof Date) ||
        this.publication_date !== null)
    ) {
      return false;
    }

    if (!this.pages && typeof this.pages !== "number") {
      return false;
    }

    return true;
  }

  sanitize() {
    this.isbn = this.isbn.replace(/-/g, "");
    this.publication_date = new Date(this.publication_date);
  }
}
