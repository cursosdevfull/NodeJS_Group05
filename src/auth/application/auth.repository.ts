import { Result } from '../../shared/application/result.interface';
import { UserModel } from '../../user/domain/user.model';

export interface AuthRepository {
  login(where: object, relations: string[]): Promise<UserModel>;
  getUserByRefreshToken(where: object, relations: string[]): Promise<UserModel>;
}
