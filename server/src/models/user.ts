import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { Collections } from ".";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isValidPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash the password if it's new or modified
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error: any) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>(Collections.Users, userSchema);

export { User };
