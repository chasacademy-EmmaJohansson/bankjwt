import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

const secret = "sommar";

function generateAccessToken(userId) {
  return jwt.sign(userId, secret);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, userId) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.userId = userId;

    next();
  });
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5002;

let users = [];

let userIds = 1;

const accounts = [];

app.post("/users", (req, res) => {
  const user = req.body;
  console.log(user);
  user.id = userIds++;
  users.push(user);

  const account = {
    money: "3650",
    userId: user.id,
  };
  accounts.push(account);

  console.log(users);

  res.statusCode = 200;
  res.send("Good work");
});

app.post("/sessions", (req, res) => {
  const user = req.body;
  console.log(user);
  const dbUser = users.find((u) => u.username == user.username);

  if (dbUser != null && dbUser.password == user.password) {
    const token = generateAccessToken(dbUser.id);

    console.log();
    res.json({ token });
  } else {
    res.status = 401;
    res.json();
  }
});

app.get("/me/accounts", authenticateToken, (req, res) => {
  console.log("userId: ", req.userId);

  const dbAccount = accounts.find((a) => a.userId == req.userId);

  res.json(dbAccount);
  res.json({ userId: req.userId });
});

app.listen(PORT, () => {
  console.log(PORT);
});
