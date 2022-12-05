import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export default class TokenValidation {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const { data } = verify(authorization, process.env.JWT_SECRET as string) as JwtPayload;
        if (data) {
          next();
        }
      }
    } catch (error) {
      return res.status(401).json({ message: error });
    }

    next();
  }
}
