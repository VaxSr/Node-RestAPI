import { Router } from "express";
import BookController from "../controller/books.js";

const router = Router();
const bookController = new BookController();

// get a list of all books
router.get("/books", bookController.getBooks);

// get the book matching the isbn (if any)
router.get("/books/:bookIsbn", bookController.getBookByIsbn);

// add a book providing data
router.post("/books", bookController.postBook);

// update book providing a isbn
router.patch("/books/:bookIsbn", bookController.patchBook);

// replace book with another one by providing a isbn
router.put("/books/:bookIsbn", bookController.putBook);

// delete the book matching the isbn (if any)
router.delete("/books/:bookIsbn", bookController.deleteBook);

export default router;
