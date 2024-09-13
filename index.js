import express from "express";
import bodyParser from "body-parser";
import bookRoutes from "./routes/book-routes.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bookRoutes);

app.get("/", (req, res) => {
  res.json({ page: "Home" });
});

app.use((req, res) => {
  res.status(404).json({ page: 404 });
});

app.listen(3000, () => {
  console.log("Running: http://localhost:3000/");
});
