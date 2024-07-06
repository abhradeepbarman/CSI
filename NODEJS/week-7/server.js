const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

const users = [];

const SECRET_KEY = "falkfljakmvlss392049rujiroql32kjkj";

// generating JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
  };
  users.push(user);
  res.status(201).send({ message: "User registered successfully" });
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user)
    return res.status(401).send({ message: "Invalid username or password" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).send({ message: "Invalid username or password" });

  const token = generateToken(user);
  res.status(200).send({ token });
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(403).send({ message: "Failed to authenticate token" });
    req.user = decoded;
    next();
  });
};

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
  res
    .status(200)
    .send({
      message: `Hello ${req.user.username}, this is a protected route!`,
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
