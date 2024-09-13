import supabase from "../model/supabase.js";

export function getBookById(req, res) {
  // const bookId = +req.params.bookId;
  // const book = books.find((book) => book.id === bookId);
  // if (book) {
  //   res.json(book);
  // } else {
  //   res.json({ page: "Not Found" });
  // }
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

export function postBook(req, res) {
  // const book = req.body;
  // console.log(book);
  // res.json(book);
}
