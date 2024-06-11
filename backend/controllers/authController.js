import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email isn't registered", formError: { message: "The given email is not registered", fields: ["email"] } });
    }
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Credentials", formError: { message: "The given email or password is incorrect", fields: ["email", "password"] } });
    }

    const token = generateToken(user);
    res.json({ token, user: { userId: user._id, username: user.username } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body;
    let user = await User.findOne({ $or: [{ email }, { username }] });

    if (user.email === email) {
      return res.status(400).json({ message: "Email is already registered", formError: { message: "The given email is already registered", fields: ["email"] } });
    } else if (user.username === username) {
      return res.status(400).json({ message: "Username is already taken", formError: { message: "The given username is already taken", fields: ["username"] } });
    }

    user = new User({ username, email, password, displayName });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token, user: { userId: user._id, username } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};