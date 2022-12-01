import { NextFunction, Request, Response } from 'express';
import * as Bcrypt from 'bcryptjs';
import UserMode from '../models/UserModel';

export default class LoginAuth {
  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const findEmail = await UserMode.findOne({ where: { email } });
    if (!findEmail) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    if (!Bcrypt.compareSync(password, findEmail?.password)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  };
}
