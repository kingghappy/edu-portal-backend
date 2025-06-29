import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import User from "../models/user.js";
import { comparePass } from "../middlewares/hashpasswrod.js";

export default class AuthService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    if (!this.jwtSecret) {
      throw new Error("JWT_SECRET is not configured");
    }
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (err) {
      throw new AppError("Invalid or expired token", 401);
    }
  }

  generateToken(payload) {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
  }

  async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new AppError("Invalid credentials", 401);

      const isMatch = await comparePass(password, user.password);
      if (!isMatch) throw new AppError("Invalid credentials", 401);

      return this.generateToken({
        email: user.email,
        role: user.role,
        refId: user.refId,
      });
    } catch (error) {
      throw new AppError(`Login failed: ${error.message}`, 500);
    }
  }
}