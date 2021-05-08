import { Result } from '../../shared/application/result.interface';
import { UseCaseRepository } from '../../shared/application/usecase.repository';
import { OperationRepository } from '../../shared/infraestructure/operation.repository';
import { UserModel } from '../domain/user.model';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

export class UserUseCase extends UseCaseRepository<
  UserModel,
  UserRepository //OperationRepository<UserModel>
> {
  // OperationRepository<UserModel>
  constructor(public operation: UserRepository) {
    super(operation);
  }

  async insertCipher(entity: UserModel) {
    entity.password = await UserService.cryptPassword(entity.password);
    entity.refreshToken = UserService.generateRefreshToken();
    return this.operation.insertCipher(entity);
  }
}
