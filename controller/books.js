import Book from "../model/Book.js";
import Response from "../utils/Response.js";

export default class BookController {
  async getBooks(_, res) {
    const response = new Response(res);
    const booksData = await Book.fetchAll();
    response.success(booksData);
  }

  async getBookByIsbn(req, res) {
const response = new Response(res);
    const bookIsbn = req.params.bookIsbn;
    const bookData = await Book.fetchByIsbn(bookIsbn);
    response.status(200);
    response.success(bookData.length === 1 ? bookData[0] : bookData);
  }

  async postBook(req, res) {
const response = new Response(res);    
const book = new Book(
      req.body.isbn,
      req.body.title,
      req.body.publication_date,
      req.body.pages
    );

    if (!book.isValid()) {
      response.status(400);
      reponse.error(book); // TODO: specify title
      return;
    }

    const bookData = await book.save();
    response.status(201);
response.success(bookData.length === 1 ? bookData[0] : bookData);
  }

  async deleteBook(req, res) {
const response = new Response(res);    
const bookIsbn = +req.params.bookIsbn;
    const deletedBook = await Book.deleteByIsbn(bookIsbn);
    response.success(deletedBook);
  }

  async patchBook(req, res) {
const response = new Response(res);
    const bookIsbn = +req.params.bookIsbn;
    const newBookData = req.body;

    const areValidProperties = Book.checkAllProperties(newBookData);
    if (!areValidProperties.isValid) {
	response.status(400);
	response.error(areValidProperties.body); // TODO: specify title
	return;
    }

    const updatedBook = await Book.updateByIsbn(bookIsbn, newBookData);
    	response.status(200);
	response.success(updatedBook);
  }

  async putBook(req, res) {
const response = new Response(res); 
    const bookIsbn = +req.params.bookIsbn;
    const newBookData = req.body;

    const areValidProperties = Book.checkAllProperties(newBookData);
    if (!areValidProperties.isValid) {
      response.status(400);
	response.error(areValidProperties.body); // TODO: specify title
	return;
    }

    const updatedBook = await Book.replaceBookByIsbn(bookIsbn, newBookData);
    response.status(200);
	response.success(updatedBook);
  }
}
