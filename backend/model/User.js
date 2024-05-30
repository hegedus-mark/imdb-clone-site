import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// the browser still sends data through http and not  https so it isn't entirely secure, maybe if we have time we can use https!
//notes, on the frontend we have to check if the username and password is unqiue and/or they're used in the database!
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
});

//This is a middleware that makes sure the passwords are awlways hashed before storing them in the database!
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

//This is the way to compare the passwords!
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
