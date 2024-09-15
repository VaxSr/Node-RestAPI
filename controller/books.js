import Book from "../model/Book.js";

export default class BookController {
  static async getBooks(_, res) {
    const booksData = await Book.fetchAll();
    res.json(booksData);
  }

  static async getBookByIsbn(req, res) {
    const bookIsbn = req.params.bookIsbn;
    const bookData = await Book.fetchByIsbn(bookIsbn);
    res.status(200).json(bookData.length === 1 ? bookData[0] : bookData);
  }

  static async postBook(req, res) {
    const book = new Book(
      req.body.isbn,
      req.body.title,
      req.body.publication_date,
      req.body.pages
    );

    if (!book.isValid()) {
      res.status(400).json(book);
      return;
    }

    const bookData = await book.save();
    res.status(201).json(bookData.length === 1 ? bookData[0] : bookData);
  }

  static async deleteBook(req, res) {
    const bookIsbn = +req.params.bookIsbn;
    const deletedBook = await Book.deleteByIsbn(bookIsbn);
    res.json(deletedBook);
  }

  static async updateBook(req, res) {
    const bookIsbn = +req.params.bookIsbn;
    const newBookData = req.body;

    const areValidProperties = Book.checkAllProperties(newBookData);
    if (!areValidProperties.isValid) {
      return res.json({ error: areValidProperties.body });
    }

    const updatedBook = await Book.updateByIsbn(bookIsbn, newBookData);
    res.status(200).json(updatedBook);
  }

  static async replaceBook(req, res) {
    const bookIsbn = +req.params.bookIsbn;
    const newBookData = req.body;

    const areValidProperties = Book.checkAllProperties(newBookData);
    if (!areValidProperties.isValid) {
      return res.json({ error: areValidProperties.body });
    }

    const updatedBook = await Book.replaceBookByIsbn(bookIsbn, newBookData);
    res.status(200).json(updatedBook);
  }
}
