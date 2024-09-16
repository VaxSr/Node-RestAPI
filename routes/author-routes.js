import { Router } from "express";
import {
  getAuthors,
  getAutorBySurname,
  postAuthor,
  deleteAuthor,
} from "../controller/authors.js";

const router = Router();

router.delete("/authors/:surname", deleteAuthor);

router.get("/authors/:surname", getAutorBySurname);

router.get("/authors", getAuthors);

router.post("/authors", postAuthor);

export default router;
