import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { comparePass } from "../config/Middleware/hashpasswrod.js";
import { configDotenv } from "dotenv";
configDotenv();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    console.log("user: ", user)
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // So sánh mật khẩu
    console.log("pass: ", password)
    console.log("user pass: ", user.password)
    const isValid = await comparePass(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Tạo token
    const token = jwt.sign({ email: user.email, refId: user.refId, role: user.role }, process.env.JWT_SECRET, {expiresIn: '1h'});

    // Trả về response
    res.status(200).json({ 
      message: "Login successful",
      token 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ 
    message: "Logout successful. Please remove the token on client side." 
  });
};

export { login };