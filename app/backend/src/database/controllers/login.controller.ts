import { Request, Response } from 'express';
import TokenManager from '../helpers/TokenManager';
import UserService from '../services/User.service';

// const userService = new UserService();

export default class UserController {
  constructor(private userService = new UserService()) { }
  public makeLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.userService.makeLogin(email, password);
    return res.status(200).json({ token });
  };

  public loginValidate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (typeof authorization === 'string') {
      const role = await TokenManager.loginValidation(authorization);
      // console.log(role);
      if (!role) {
        res.status(401).json({ message: 'Invalid Token' });
      }
      res.status(200).json({ role });
    }
  };
}
