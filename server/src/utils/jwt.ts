import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env";

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
