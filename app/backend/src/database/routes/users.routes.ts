// import { Request, Response, Router } from 'express';
import { Router } from 'express';
import UserController from '../controllers/login.controller';
import LoginAuth from '../middleware/LoginAuth';

const userController = new UserController();
const userRouter = Router();
const loginAuth = new LoginAuth();

userRouter.post('/login', loginAuth.validateLogin, userController.makeLogin);
userRouter.get('/login/validate', userController.loginValidate);

export default userRouter;
