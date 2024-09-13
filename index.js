import express from "express";
import bodyParser from "body-parser";
const app = express();

const users = [
  {
    id: 1,
    nome: "x",
    anni: 20,
  },
  {
    id: 2,
    nome: "y",
    anni: 20,
  },
  {
    id: 3,
    nome: "z",
    anni: 20,
  },
];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/users/:userId", (req, res) => {
  const userId = +req.params.userId;
  const user = users.find((user) => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.json({ page: "Not Found" });
  }
});

app.post("/users", (req, res, next) => {
  const user = req.body;
  console.log(user);
  res.json(user);
});

app.get("/users", (req, res, next) => {
  res.json(users);
});

app.get("/", (req, res) => {
  res.json({ page: "Home" });
});

app.use("", (req, res) => {
  res.json({ page: 404 });
});

app.listen(3000);
