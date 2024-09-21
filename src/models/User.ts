import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

export default User;
