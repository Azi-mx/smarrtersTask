import express from "express";
import mongoose from "mongoose";
require("dotenv").config();
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import adminRoutes from "./routes/adminRoutes";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/transaction",transactionRoutes);
app.use("/admin",adminRoutes)

mongoose
  .connect(`${process.env.DATABASE_URL}`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
