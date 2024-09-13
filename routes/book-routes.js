import { Router } from "express";
import { getBookById, getBooks, postBook } from "../controller/books.js";

const router = Router();

router.get("/books/:bookId", getBookById);

router.get("/books", getBooks);

router.post("/books", postBook);

export default router;
