import { AppError } from "../utils/AppError.js";

 const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

export default errorHandler