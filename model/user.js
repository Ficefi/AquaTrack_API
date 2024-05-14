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
    name: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    weight: {
      type: Number,
      default: null,
    },
    time: {
      type: Number,
      default: null,
    },
    waterRate: {
      type: Number,
      default: null,
    },
    avatarURL: String,
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false }
);

userSchema.methods.hashPasswords = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

export const User = model('user', userSchema);
