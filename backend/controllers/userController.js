
export const getWatchList = async (req, res) => {
  const userData = req.userData;
  const watchlist = userData.populate("watchlist")

  res.json({ watchlist: watchlist })
}

export const changePassword = async (req, res) => {
  const userData = req.userData;

  const { currentPassword, newPassword } = req.body;
  const correctPassword = await userData.comparePassword(currentPassword);

  if (!correctPassword) {
    return res.status(401).json({ message: "Invalid Credentials", errors: { message: "The given password is incorrect" } });
  }

  userData.password = newPassword;
  await userData.save();
  res.json({ message: "Password changed successfully" });
}


export const getProfile = async (req, res) => {
  const userData = req.userData;
  const { _id, username, email, displayName } = userData;
  res.json({ user: { userId: _id, username, email, displayName } })
}