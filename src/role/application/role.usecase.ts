import { UseCaseRepository } from '../../shared/application/usecase.repository';
import { RoleModel } from '../domain/role.model';
import { RoleRepository } from './role.repository';

export class RoleUseCase extends UseCaseRepository<RoleModel, RoleRepository> {
  constructor(public operation: RoleRepository) {
    super(operation);
  }
}
