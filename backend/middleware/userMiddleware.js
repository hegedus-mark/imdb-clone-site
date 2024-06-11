import User from "../models/User.js";

export const validateUser = async (req, res, next) => {
  const { userId } = req.params;
  if (req.user.userId === userId) {
    try {
      const userData = await User.findById(userId);
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      req.userData = userData;
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};