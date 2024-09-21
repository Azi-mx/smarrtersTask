import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  bookName: string;
  returnDate:string;
  bookId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  issueDate:string;
  issuedDays:number;
}

const TransactionSchema: Schema = new Schema({
  bookName: { type: String, required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  issuedDays:{ type: String, required: true },
});

const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
