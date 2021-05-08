import { UserModel } from '../domain/user.model';
import { OperationRepository } from '../../shared/infraestructure/operation.repository';
import { UserRepository } from '../application/user.repository';
import { User } from '../../entities/user.entity';
import { Result } from '../../shared/application/result.interface';
import { OperationService } from '../../shared/infraestructure/operation.service';
import { getRepository, Repository } from 'typeorm';
import { ResponseDto } from '../../helper/response.dto';
import { UserService } from './user.service';

export class UserOperation
  extends OperationRepository<UserModel>
  implements UserRepository {
  constructor() {
    super(User);
  }

  async insertCipher(entity: UserModel): Promise<Result<UserModel>> {
    const trace: string = OperationService.getTrace();
    const repository: Repository<User> = getRepository(User);
    entity.password = await UserService.cryptPassword(entity.password);
    const data: UserModel = await repository.save(entity);
    return ResponseDto.format(trace, data);
  }
}
