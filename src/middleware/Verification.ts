const jwt = require('jsonwebtoken');
require("dotenv").config();
import { Request, Response } from "express";
export const verifyToken = (req: Request, res: Response, next:any) => {
    const token = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
        next();
        return res.send("Successfully Verified");
    } else {
        return res.status(401).send(Error);
    }
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 };
}
// module.exports = verifyToken;