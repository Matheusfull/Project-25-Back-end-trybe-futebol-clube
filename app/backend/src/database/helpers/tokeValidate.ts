import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export default class TokenValidation {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const data = verify(authorization, process.env.JWT_SECRET as string) as JwtPayload;
        console.log(data.payload);
        // if (!data.payload) return res.status(401).json({ message: 'Token must be a valid token' });
      }
    } catch (_error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
