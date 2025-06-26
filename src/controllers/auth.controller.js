import { loginUser, logoutUser } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token } = await loginUser(email, password)

    res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

const logout = (req, res) => {
  const result = logoutUser()
  res.status(200).json(result)
};

export { login, logout };