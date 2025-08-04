import jwt from 'jsonwebtoken';

interface JWTPayload {
  id: string;
  role?: string;
}

export const generateJWT = (
  payload: JWTPayload,
  expiresIn = "1d"
): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment");
  }

  return jwt.sign(payload, secret, {
    expiresIn
  } as jwt.SignOptions);
};
