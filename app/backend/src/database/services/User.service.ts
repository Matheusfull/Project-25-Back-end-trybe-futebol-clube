import * as Bcrypt from 'bcryptjs';
import TokenManager from '../helpers/TokenManager';
import UserModel from '../models/UserModel';

/* interface IRequest {
  email: string;
  password?: string;
} */

export default class UserService {
  constructor(private model = UserModel) { }
  makeLogin = async (email: string, password: string) => {
    const user = await this.model.findOne({ where: { email } });

    if (!user) return { message: 'Invalid fields' };

    if (!Bcrypt.compareSync(password, user.password)) {
      return { message: 'DATA_NOTFOUND' };
    }

    const token = TokenManager.makeToken(user);
    return token;
  };
}
