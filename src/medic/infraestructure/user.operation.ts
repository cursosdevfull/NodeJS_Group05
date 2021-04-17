import { UserModel } from '../domain/user.model';
import { OperationRepository } from '../../shared/infraestructure/operation.repository';
import { UserRepository } from '../application/user.repository';

export class UserOperation
  extends OperationRepository<UserModel>
  implements UserRepository {}
