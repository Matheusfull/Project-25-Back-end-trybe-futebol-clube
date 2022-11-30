import { Request, Response, Router } from 'express';
import UserController from '../controllers/login.controller';

const userController = new UserController();
const userRouter = Router();

userRouter.post('/login', (req: Request, res: Response) => userController.makeLogin(req, res));

export default userRouter;
