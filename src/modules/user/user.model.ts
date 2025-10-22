import { Schema, Document, model } from 'mongoose';
import {User} from '../../types/user.type';

export interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
  setPassword(password: string, salt: string): void;
  getPassword(): string | undefined;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15']
  },
  email: {
    type: String,
    required: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    unique: true
  },
  avatar: { type: String },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Min length for password is 6'],
    maxlength: [12, 'Max length for password is 12'], },
  type: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
