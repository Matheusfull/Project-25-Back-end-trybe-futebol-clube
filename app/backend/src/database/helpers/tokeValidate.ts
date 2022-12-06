import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export default class TokenValidation {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    try {
      if (token !== undefined) {
        const data = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        console.log(data);
        // if (!data.payload) return res.status(401).json({ message: 'Token must be a valid token' });
      } else {
        return res.status(401).json({ message: 'Token precisa ser passado' });
      }
      // console.log(token);
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
