import { RoleModel } from '../domain/role.model';
import { OperationRepository } from '../../shared/infraestructure/operation.repository';
import { RoleRepository } from '../application/role.repository';
import { Role } from '../../entities/role.entity';
import { getRepository, Repository } from 'typeorm';
export class RoleOperation
  extends OperationRepository<RoleModel>
  implements RoleRepository
{
  constructor() {
    super(Role);
  }

  async getOne(
    where: object = {},
    relations: string[] = []
  ): Promise<RoleModel> {
    const repository: Repository<RoleModel> = getRepository(Role);
    const data = await repository.findOne({ where, relations });
    return data;
  }
}
