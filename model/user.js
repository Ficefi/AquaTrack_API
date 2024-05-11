import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: String,
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.methods.hashPasswords = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

export const User = model('user', userSchema);
