import express from "express";
import bodyParser from "body-parser";
import bookRoutes from "./routes/book-routes.js";
import authorRoutes from "./routes/author-routes.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bookRoutes);
app.use(authorRoutes);

app.get("/", (_, res) => {
  res.json({ page: "Home" });
});

app.use((_, res) => {
  res.status(404).json({ page: 404 });
});

app.listen(3000, () => {
  console.log("Running: http://localhost:3000/");
});
