import supabase from "../model/supabase.js";

export async function getBookById(req, res) {
  const bookId = +req.params.bookId;
  const { data, error } = await supabase.from("book").select().eq("id", bookId);

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data:", data);
  }
  res.json(data);
}

export async function getBooks(req, res, next) {
  const { data, error } = await supabase.from("libro").select("*");
  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data:", data);
  }
  res.json(data);
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
