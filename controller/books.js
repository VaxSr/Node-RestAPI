import Book from "../model/Book.js";

export async function getBooks(_, res) {
  const booksData = await Book.fetchAll();
  res.json(booksData);
}

export async function getBookByIsbn(req, res) {
  const bookIsbn = req.params.bookIsbn;
  const bookData = await Book.fetchByISbn(bookIsbn);
  res.status(200).json(bookData.length === 1 ? bookData[0] : bookData);
}

export async function postBook(req, res) {
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

export async function deleteBook(req, res) {
  const bookIsbn = +req.params.bookIsbn;
  const deletedBook = await Book.deleteByIsbn(bookIsbn);
  res.json(deletedBook);
}
