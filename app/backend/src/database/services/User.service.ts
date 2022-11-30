import TokenManager from '../helpers/TokenManager';
import UserModel from '../models/UserModel';

interface IRequest {
  email: string;
  password: string;
}

export default class UserService {
  public makeLogin = async ({ email, password }: IRequest) => {
    const user = await UserModel.findOne({ where: { email, password } });

    if (!user) throw new Error('Invalid fields');

    const token = TokenManager.makeToken(user);
    return token;
  };
}
