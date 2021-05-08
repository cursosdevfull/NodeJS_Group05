import * as bcryptjs from 'bcryptjs';

export class UserService {
  static async cryptPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }
}
