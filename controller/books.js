import supabase from "../config/supabase.js";
import Book from "../model/Book.js";

export default class BookController {
  static async getBooks(_, res) {
    const booksData = await Book.fetchAll();
    res.json(booksData);
  }

  static async getBookByIsbn(req, res) {
    const bookIsbn = req.params.bookIsbn;
    const bookData = await Book.fetchByISbn(bookIsbn);
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
    // TODO: check if the properties you want to change exist in the db

    const updatedBook = await Book.updateByIsbn(bookIsbn, newBookData);

    res.status(200).json(updatedBook);
  }

  // TODO: replaceBook
}
