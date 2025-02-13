import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'User Name is require'],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      require: [true, 'User Email is require'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Plese fill a valid email address'],
    },
    password: {
      type: String,
      require: [true, 'User Password is require'],
      minLength: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
