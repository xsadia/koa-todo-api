import { model, Schema, Types, Document } from "mongoose";
import { IUser } from "./User";

export interface ITodo extends Document {
  content: string;
  isCompleted: boolean;
  createdAt: Date;
  owner: IUser["_id"];
}

const TodoSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Todo = model<ITodo>("Todo", TodoSchema);
