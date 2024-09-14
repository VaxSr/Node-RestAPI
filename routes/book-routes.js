import { Router } from "express";
import {
  deleteBook,
  getBookByIsbn,
  getBooks,
  postBook,
} from "../controller/books.js";

const router = Router();

router.delete("/books/:bookIsbn", deleteBook);

router.get("/books/:bookIsbn", getBookByIsbn);

router.get("/books", getBooks);

router.post("/books", postBook);

export default router;
