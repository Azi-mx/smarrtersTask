import { Request, Response } from "express";
import Admin from "../models/Admin";
const jwt = require('jsonwebtoken');
require("dotenv").config();
export const createUser = async (req: Request, res: Response) => {
    const { adminId, name, email, phone } = req.body;
    const admin = new Admin({ adminId, name, email, phone });
    try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        admin
    }
    const token = jwt.sign(data, jwtSecretKey);
    res.send(token);
      const newUser = await admin.save();
      res.status(201).json(newUser);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  };