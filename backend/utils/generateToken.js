import jwt from 'jsonwebtoken';
import { secretKey } from "../config/jwt.js";

/**
 * Generates a JSON Web Token (JWT) for the given user.
 *
 * @param {Object} user - The user object containing the user's ID and username.
 * @param {string} user.userId - The ID of the user.
 * @param {string} user.username - The username of the user.
 * @return {Promise<string>} A promise that resolves to the generated JWT.
 */
export const generateToken = ({ _id, username }) => {
  return jwt.sign({ userId: _id, username }, secretKey, { expiresIn: '1h' });
};