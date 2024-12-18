import User from "../models/User.js";
import jwt from "jsonwebtoken"
import { generateToken } from "../utils/generateToken.js";
import { generateRefreshToken } from "../utils/generateToken.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('Email isn\'t registered', 401, {
      formError: {
        message: 'The given email is not registered',
        fields: ['email']
      }
    });
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new AppError('Invalid Credentials', 401, {
      formError: {
        message: 'The given email or password is incorrect',
        fields: ['email', 'password']
      }
    });
  }

  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });

  res.json({
    token,
    user: {
      userId: user._id,
      username: user.username
    }
  });
});


export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, displayName } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser && existingUser.email === email) {
    throw new AppError('Email is already registered', 400, {
      formError: {
        message: 'The given email is already registered',
        fields: ['email']
      }
    });
  } else if (existingUser && existingUser.username === username) {
    throw new AppError('Username is already taken', 400, {
      formError: {
        message: 'The given username is already taken',
        fields: ['username']
      }
    });
  }

  const user = new User({ username, email, password, displayName });
  await user.save();

  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });

  res.status(201).json({
    token,
    user: {
      userId: user._id,
      username: user.username
    }
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new AppError('Unauthorized', 401);
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError('Invalid refresh token', 401);
    }

    const newAccessToken = generateToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    throw new AppError('Invalid refresh token', 401);
  }
});