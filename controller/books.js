import supabase from "../config/supabase.js";
import Book from "../model/Book.js";
import Response from "../utils/Response.js";

export async function getBooks(_, res) {
  const response = new Response(res);

  const { data, error } = await supabase.from("book").select("*");
  if (error) {
    console.error("Error fetching data:", error);
    response.status(500);
    response.error({
      message: "Error fetching data:",
      data: error,
    });
  } else {
    console.log("Data:", data);
    response.status(200);
    response.success(data);
  }
}

export async function getBookByIsbn(req, res) {
  const response = new Response(res);

  const bookIsbn = req.params.bookIsbn;
  const { data, error } = await supabase
    .from("book")
    .select("*")
    .eq("isbn", bookIsbn);

  if (error) {
    console.error("Error fetching data:", error);

    response.status(500);
    response.error({
      message: "Error fetching data:",
      data: error,
    });
  } else {
    console.log("Data:", data);
    response.status(200);
    response.success(data);
  }
}

export async function postBook(req, res) {
  const response = new Response(res);

  const book = new Book(
    req.body.isbn,
    req.body.title,
    req.body.publication_date,
    req.body.pages
  );

  book.sanitize();

  if (!book.isValid()) {
    response.status(400);
    response.error({
      message: "Invalid data provided",
      data: book,
    });
  } else {
    const { data, error } = await supabase.from("book").insert(book).select();

    if (error) {
      console.error("Error fetching data:", error);

      response.status(409);
      response.error({
        message: "Resource already exists.",
        details: "",
      });
    } else {
      console.log("Data:", data);
      response.status(201);
      response.success(data.length === 1 ? data[0] : data);
    }
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
