import express from "express";
import { getTransactionsByBookName,issueBook,returnBook
} from "../controllers/transactionController";

const router = express.Router();

router.get("/", getTransactionsByBookName);
router.post("/", issueBook);
router.post("/:id", returnBook);


export default router;
