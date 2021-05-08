import * as bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jwt-simple';
import moment from 'moment';

export class UserService {
  static async cryptPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }

  static async decryptPassword(
    password: string,
    passwordCipher: string
  ): Promise<boolean> {
    return await bcryptjs.compare(password, passwordCipher);
  }

  static generateAccessToken(name: string, photo: string) {
    const iat = moment().unix();
    const exp = moment().add(30, 'seconds').unix();
    const payload = {
      name,
      photo,
      iat,
      exp,
    };

    return jwt.encode(payload, 'superSecreto');
  }

  static generateRefreshToken(): string {
    return uuidv4();
  }
}
