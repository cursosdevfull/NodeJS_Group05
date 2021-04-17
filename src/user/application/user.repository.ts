import { RepositoryBase } from '../../shared/application/base.repository';
import { UserModel } from '../domain/user.model';

export interface UserRepository extends RepositoryBase<UserModel> {}
