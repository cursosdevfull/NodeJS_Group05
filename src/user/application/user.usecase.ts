import { Result } from '../../shared/application/result.interface';
import { UseCaseRepository } from '../../shared/application/usecase.repository';
import { OperationRepository } from '../../shared/infraestructure/operation.repository';
import { UserModel } from '../domain/user.model';

export class UserUseCase extends UseCaseRepository<
  UserModel,
  OperationRepository<UserModel>
> {
  constructor(public operation: OperationRepository<UserModel>) {
    super(operation);
  }

  async insertCipher() {
    return this.operation.insertCipher();
  }
}
