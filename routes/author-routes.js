import { Router } from "express";
import {
  getAuthors,
  getAutorBySurname,
  postAuthor,
  deleteAuthor,
} from "../controller/authors.js";

const router = Router();

// get a list of all authors
router.get("/authors", getAuthors);

// get author by surname
router.get("/authors/:surname", getAutorBySurname);

// add authors
router.post("/authors", postAuthor);

// delete author by surname
router.delete("/authors/:surname", deleteAuthor);

export default router;
