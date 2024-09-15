import { Router } from "express";
import BookController from "../controller/books.js";

const router = Router();

router.delete("/books/:bookIsbn", BookController.deleteBook);

router.get("/books/:bookIsbn", BookController.getBookByIsbn);

router.get("/books", BookController.getBooks);

router.post("/books", BookController.postBook);

// update book providing a isbn
router.patch("/books/:bookIsbn", BookController.updateBook);

// replace book with another providing a isbn
router.put("/books/:bookIsbn");

export default router;
