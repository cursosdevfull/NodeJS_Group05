import { RepositoryBase } from '../../shared/application/base.repository';
import { Result } from '../../shared/application/result.interface';
import { UserModel } from '../domain/user.model';

export interface UserRepository extends RepositoryBase<UserModel> {
  insertCipher(entity: UserModel): Promise<Result<UserModel>>;
}
