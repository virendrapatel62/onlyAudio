import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { JWT_SECRET } from "../utils/env";
import { handler } from "../utils/handler-utils";
import {
  authLoginBodySchema,
  authSignupBodySchema,
} from "../validation-schemas/auth";

const router = express.Router();

// @route   POST /api/auth/signup
// @description    Register a new user
router.post("/signup", async (request: Request, response: Response) => {
  const body = authSignupBodySchema.validateSync(request.body, {
    abortEarly: false,
  });
  const { username, email, password } = body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    response.status(400).json({ message: "User already exists" });
    return;
  }

  // Create a new user
  const newUser = new User({
    username,
    email,
    password,
  });

  // Save the new user (password will be hashed automatically)
  await newUser.save();

  // Generate JWT token
  const payload = { userId: newUser._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour

  // Send response with the JWT token
  response.status(201).json({ message: "User created successfully", token });
});

// @route   POST /api/auth/login
// @desc    Login an existing user
router.post(
  "/login",
  handler(async (request: Request, response: Response) => {
    const body = await authLoginBodySchema.validate(request.body, {
      abortEarly: false,
    });
    const { email, password } = body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      response.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      response.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const payload = { userId: user._id };

    const token = jwt.sign(payload, JWT_SECRET);
    console.log(user);
    // Send response with the JWT token
    response.status(200).json({ message: "Login successful", token, user });
  })
);

export { router as authRouter };
