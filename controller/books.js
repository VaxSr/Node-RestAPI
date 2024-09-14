import supabase from "../config/supabase.js";

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
  const bookTitle = req.body.title;
  const bookType = req.body.type;
  const authorName = req.body.authorName;

  const { data, error } = await supabase
    .from("book")
    .insert({ title: bookTitle, type: bookType, author_name: authorName })
    .select();

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data:", data);
  }

  res.json(data);
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
