import { Request, Response } from "express";
import Book from "../models/Book";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};



export const createBook = async (req: Request, res: Response) => {
  const { bookName, category, rentPerDay } = req.body;
  const book = new Book({ bookName, category, rentPerDay });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const { bookName, category, rentPerDay } = req.body;
    if (bookName) book.bookName = bookName;
    if (category) book.category = category;
    if (rentPerDay) book.rentPerDay = rentPerDay;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // await book.remove();
    res.json({ message: "Book deleted" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({
      bookName: { $regex: req.params.name, $options: "i" },
    });
    res.json(books);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};




