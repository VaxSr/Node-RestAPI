import { Router } from "express";
import BookController from "../controller/books.js";

const router = Router();
const bookController = new BookController();

router.delete("/books/:bookIsbn", bookController.deleteBook);

router.get("/books/:bookIsbn", bookController.getBookByIsbn);

router.get("/books", bookController.getBooks);

router.post("/books", bookController.postBook);

// update book providing a isbn
router.patch("/books/:bookIsbn", bookController.patchBook);

// replace book with another providing a isbn
router.put("/books/:bookIsbn", bookController.putBook);

export default router;
