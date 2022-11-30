import { Request, Response } from 'express';
import UserService from '../services/User.service';

const userService = new UserService();

export default class UserController {
  public makeLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const token = await userService.makeLogin({ email, password });
    return res.status(200).json({ token });
  };
}
