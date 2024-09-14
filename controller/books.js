import supabase from "../config/supabase.js";
import Book from "../model/Book.js";

export async function getBooks(_, res) {
  const { data, error } = await supabase.from("book").select("*");
  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data:", data);
  }
  res.json(data);
}

export async function getBookByIsbn(req, res) {
  const bookIsbn = req.params.bookIsbn;
  const { data, error } = await supabase
    .from("book")
    .select("*")
    .eq("isbn", bookIsbn);

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data:", data);
  }
  res.json(data.length === 1 ? data[0] : data);
}

export async function postBook(req, res) {
  const book = new Book(
    req.body.isbn,
    req.body.title,
    req.body.publication_date,
    req.body.pages
  );

  book.sanitize();

  if (!book.isValid()) {
    res.status(400);
    res.json(book);
    return;
  }

  const { data, error } = await supabase.from("book").insert(book).select();

  if (error) {
    console.error("Error fetching data:", error);

    /* TODO: improve error handling
    res.status(409);
    res.setHeader("content-type", "application/problem+json");
    res.send({
      message: "Resource already exists.",
      detail: "",
    });
    */

    res.send(error);
  } else {
    console.log("Data:", data);
    res.status(201);
    res.json(data.length === 1 ? data[0] : data);
  }
}

export async function deleteBook(req, res) {
  const bookId = +req.params.bookId;

  const { data, error } = await supabase
    .from("book")
    .delete()
    .eq("id", bookId)
    .select();

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data:", data);
  }
  res.json(data);
}
