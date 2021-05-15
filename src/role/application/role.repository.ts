import { RepositoryBase } from '../../shared/application/base.repository';
import { RoleModel } from '../domain/role.model';

export interface RoleRepository extends RepositoryBase<RoleModel> {
  getOne(entity: object, relations: string[]): Promise<RoleModel>;
}
