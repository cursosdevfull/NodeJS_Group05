import { IError } from '../../helper/errors.handler';
import { UserService } from '../../user/application/user.service';
import { UserModel } from '../../user/domain/user.model';
import { AuthRepository } from './auth.repository';

export class AuthUseCase {
  constructor(public operation: AuthRepository) {}

  async login(entity: Partial<UserModel>) {
    const user: UserModel = await this.operation.login(
      { email: entity.email },
      ['roles']
    );
    console.log('user', user);

    if (user) {
      const matched = await UserService.decryptPassword(
        entity.password,
        user.password
      );
      if (matched) {
        const accessToken = UserService.generateAccessToken(
          user.name,
          user.photo,
          user.roles.map((role) => role.name)
        );
        // const refreshToken = UserService.generateRefreshToken();
        return { accessToken, refreshToken: user.refreshToken };
      }
      return null;
    }
    return null;
  }

  async getNewAccessToken(entity: Partial<UserModel>) {
    const user: UserModel = await this.operation.getUserByRefreshToken(
      { refreshToken: entity.refreshToken },
      []
    );

    console.log('user', user);

    if (!user) {
      return null;
    } else {
      const accessToken = UserService.generateAccessToken(
        user.name,
        user.photo,
        user.roles.map((role) => role.name)
      );

      return { accessToken, refreshToken: user.refreshToken };
    }
  }
}
