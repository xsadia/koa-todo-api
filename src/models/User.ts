import { model, Schema, Document, Types } from 'mongoose';
import { ITodo } from './Todo';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    todos: Array<ITodo["_id"]>;
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todos: [
        {
            type: Types.ObjectId,
            ref: 'Todo'
        }
    ]
});

export const User = model<IUser>('User', UserSchema);