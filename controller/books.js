import books from "../model/supabase.js";

export function getBookById(req, res) {
  const bookId = +req.params.bookId;
  const book = books.find((book) => book.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.json({ page: "Not Found" });
  }
}

export function getBooks(req, res, next) {
  res.json(books);
}

export function postBook(req, res) {
  const book = req.body;
  console.log(book);
  res.json(book);
}
