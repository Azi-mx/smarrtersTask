import mongoose, { Schema, Document } from "mongoose";

interface IBook extends Document {
  bookName: string;
  category: string;
  rentPerDay: number;
}

const BookSchema: Schema = new Schema({
  bookName: { type: String, required: true },
  category: { type: String, required: true },
  rentPerDay: { type: Number, required: true },
});

const Book = mongoose.model<IBook>("Book", BookSchema);

export default Book;