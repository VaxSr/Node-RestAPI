import supabase from "../config/supabase.js";
import Author from "../model/Author.js";

export async function getAuthors(_, res) {
  const { data, error } = await supabase.from("author").select("*");
  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data:", data);
  }
  res.json(data);
}

export async function getAutorBySurname(req, res) {
  const surname = req.params.surname;
  const { data, error } = await supabase
    .from("author")
    .select("*")
    .eq("surname", surname);

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data:", data);
  }

  res.status(200).json(data.length === 1 ? data[0] : data);
}

export async function postAuthor(req, res) {
  const author = new Author(req.body.name, req.body.surname);
  console.log(author);
  const { data, error } = await supabase.from("author").insert(author).select();

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data:", data);
    res.status(201).json(data);
  }
}

export async function deleteAuthor(req, res) {
  const author = +req.params.surname;

  const { data, error } = await supabase
    .from("author")
    .delete()
    .eq("surname", author)
    .select();

  /* IDEA: quando si cancella 
    un autore vengono cancellati 
    tutti i suoi libri */

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Data:", data);
  }
  res.json(data);
}
