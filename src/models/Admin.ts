import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema({
  adminId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
