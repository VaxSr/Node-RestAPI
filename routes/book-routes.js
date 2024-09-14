import { Router } from "express";
import {
  deleteBook,
  getBookById,
  getBooks,
  postBook,
} from "../controller/books.js";

const router = Router();

router.delete("/books/:bookId", deleteBook);

router.get("/books/:bookId", getBookById);

router.get("/books", getBooks);

router.post("/books", postBook);

export default router;
