import express from "express";
import mongoose from "mongoose";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { PASSWORD, USERNAME, CLUSTER, ACCESS_TOKEN } from "./sensitiveData.js";
import User from "./model/User.js";
mongoose.connect(
  `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.mongodb.net/freestyleMERN`
);
const baseUrl = "https://api.themoviedb.org/3/movie";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

//secret key for jwt
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Secret Key:', secretKey);

// jwt token for authentication
const generateToken = (user) => {
  return jwt.sign({ userId: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
};

//verification middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

const app = express();
const PORT = 6969;
app.use(express.json());

app.get("/api/movies/popular", (req, res) => {
  const url = `${baseUrl}/popular?language=en-US&page=1`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.json(json))
    .catch((err) => {
      console.log(err),
        res.status(506).json({ message: "Something went wrong" });
    });
});

app.get("/api/movie/:id", (req, res) => {
  const ID = req.params.id;
  const url = `${baseUrl}/${ID}`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.json(json))
    .catch((err) => {
      console.log(err),
        res.status(506).json({ message: "Something went wrong" });
    });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //generating that fancy JWT token
  const token = generateToken(user);
  console.log(token);

  res.json({ token });
})

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  console.log(username, email, password)

  try {
    let user = await User.findOne({ email });
    if (user) {
      //we need to handle this on client side!!
      return res.status(400).json({ message: "User already exists!" });
    }

    user = new User({
      username, email, password, displayName
    });

    await user.save();
    const token = generateToken(user);

    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Oopsie daisy, tiny server problemo" });
  }
});

app.get("/api/protected/userData", verifyToken, (req, res) => {
  res.json({ message: "Hello there user!" });
})

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
