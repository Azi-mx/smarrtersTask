import { Request, Response } from "express";
import Transaction, { ITransaction } from "../models/Transaction";
import Book from "../models/Book";
import User from "../models/User";
import mongoose from "mongoose";

export const issueBook = async (req: Request, res: Response) => {
  const { bookName, userId, issueDate } = req.body;

  try {
    const book = await Book.findOne({ bookName });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTransaction = new Transaction({
      bookId: book._id,
      userId: user._id,
      issueDate,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  const { bookName, userId, returnDate } = req.body;

  try {
    const book = await Book.findOne({ bookName });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transaction = await Transaction.findOne({
      bookId: book._id,
      userId: user._id,
      returnDate: { $exists: false },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.returnDate = returnDate;
    const issuedDaysTotal = Math.ceil(
      (new Date(returnDate).getTime() -
        new Date(transaction.issueDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    transaction.issuedDays = issuedDaysTotal;
    const savedTransaction = await transaction.save();
    res.json(savedTransaction);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getTransactionsByBookName = async (
  req: Request,
  res: Response
) => {
  const { bookName } = req.params;

  try {
    const book = await Book.findOne({ bookName });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const transactions = await Transaction.find({ bookId: book._id });

    const users = await User.find({
      _id: { $in: transactions.map((transaction) => transaction.userId) },
    }).select("name email");

    const totalCount = users.length;

    const currentlyIssuedTransaction = transactions.find(
      (transaction) => !transaction.returnDate
    );
    const currentlyIssued = currentlyIssuedTransaction
      ? await User.findById(currentlyIssuedTransaction.userId).select(
          "name email"
        )
      : null;
    const status = currentlyIssued
      ? "Currently issued"
      : "Not issued at the moment";

    res.json({
      users,
      totalCount,
      currentlyIssued,
      status,
    });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
