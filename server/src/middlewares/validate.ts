import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors.map((e: any) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }
};
