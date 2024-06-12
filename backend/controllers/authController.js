import User from "../models/User.js";
import jwt from "jsonwebtoken"
import { REFRESH_KEY } from "../config/sensitiveData.js";
import { generateToken } from "../utils/generateToken.js";
import { generateRefreshToken } from "../utils/generateToken.js";

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
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
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

    if (user && user.email === email) {
      return res.status(400).json({ message: "Email is already registered", formError: { message: "The given email is already registered", fields: ["email"] } });
    } else if (user && user.username === username) {
      return res.status(400).json({ message: "Username is already taken", formError: { message: "The given username is already taken", fields: ["username"] } });
    }

    user = new User({ username, email, password, displayName});
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    const token = generateToken(user);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(201).json({ token, user: { userId: user._id, username } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_KEY);
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      console.log("Invalid refresh token");
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateToken(user);
    const newRefreshToken = generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();
    console.log("saved new refresh token: ", newRefreshToken);
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}