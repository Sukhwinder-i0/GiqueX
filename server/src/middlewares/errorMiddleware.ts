import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

export const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error"

  return res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    ...(err.errors && err.errors.length > 0 && { errors: err.errors }),
  })
}