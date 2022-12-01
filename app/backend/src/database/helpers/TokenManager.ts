import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class TokenManager {
  static makeToken = (payload: unknown) => {
    /* const jwtAux = {
      secret: String(process.env.JWT_SECRET),
    }; */
    const token = jwt.sign({ payload }, process.env.JWT_SECRET as string, {
      expiresIn: '15d',
      algorithm: 'HS256',
    });
    return token;
  };

  static loginValidation = async (auth: string): Promise<string | null | jwt.JwtPayload> => {
    const roleValidation = jwt.decode(auth);

    return roleValidation;
  };
}
