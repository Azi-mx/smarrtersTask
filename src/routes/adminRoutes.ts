import express from "express";
import { createUser } from "../controllers/adminController";
import { verifyToken } from "../middleware/Verification";


const router = express.Router();

router.post("/",verifyToken, createUser);


export default router;
