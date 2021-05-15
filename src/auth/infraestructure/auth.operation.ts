import { AuthRepository } from '../application/auth.repository';
import { User } from '../../entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { UserModel } from '../../user/domain/user.model';

export class AuthOperation implements AuthRepository {
  async login(where: object, relations: string[]): Promise<UserModel> {
    const repository: Repository<User> = getRepository(User);
    const data: UserModel = await repository.findOne({ where, relations });
    return data;
  }

  async getUserByRefreshToken(
    where: object,
    relations: string[]
  ): Promise<UserModel> {
    const repository: Repository<User> = getRepository(User);
    const data: UserModel = await repository.findOne({ where, relations });
    return data;
  }
}
