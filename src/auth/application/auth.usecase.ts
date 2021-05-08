import { UserService } from '../../user/application/user.service';
import { UserModel } from '../../user/domain/user.model';
import { AuthRepository } from './auth.repository';

export class AuthUseCase {
  constructor(public operation: AuthRepository) {}

  async login(entity: Partial<UserModel>) {
    const user: UserModel = await this.operation.login(
      { email: entity.email },
      []
    );
    if (user) {
      const matched = await UserService.decryptPassword(
        entity.password,
        user.password
      );
      if (matched) {
        const accessToken = UserService.generateAccessToken(
          user.name,
          user.photo
        );
        const refreshToken = UserService.generateRefreshToken();
        return { accessToken, refreshToken };
      }
      return null;
    }
    return null;
  }
}
