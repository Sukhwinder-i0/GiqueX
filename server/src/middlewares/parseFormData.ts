import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to parse FormData fields before validation
 * Converts string values to appropriate types (number, array, etc.)
 */
export const parseFormData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Parse price to number if it exists
  if (req.body.price !== undefined && req.body.price !== null && req.body.price !== '') {
    const parsedPrice = Number(req.body.price);
    if (!isNaN(parsedPrice)) {
      req.body.price = parsedPrice;
    }
  }

  // Parse tags to array if it exists
  if (req.body.tags !== undefined && req.body.tags !== null) {
    if (typeof req.body.tags === 'string') {
      // If tags is a string, split by comma and trim
      const trimmedTags = req.body.tags.trim();
      if (trimmedTags === '') {
        // Empty string becomes empty array
        req.body.tags = [];
      } else {
        req.body.tags = trimmedTags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 0);
      }
    } else if (Array.isArray(req.body.tags)) {
      // If it's already an array, keep it as is but filter empty strings
      req.body.tags = req.body.tags.filter((tag: any) => tag && String(tag).trim().length > 0);
    }
  }

  next();
};
