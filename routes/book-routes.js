import { Router } from "express";
import BookController from "../controller/books";

const router = Router();

router.delete("/books/:bookIsbn", BookController.deleteBook);

router.get("/books/:bookIsbn", BookController.getBookByIsbn);

router.get("/books", BookController.getBooks);

router.post("/books", BookController.postBook);

export default router;
