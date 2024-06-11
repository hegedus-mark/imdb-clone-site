import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
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

    if (user) {
      return res.status(400).json({ message: "Email or username already taken" });
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