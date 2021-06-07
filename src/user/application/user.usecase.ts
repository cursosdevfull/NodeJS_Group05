import { RoleRepository } from '../../role/application/role.repository';
import { Result } from '../../shared/application/result.interface';
import { UseCaseRepository } from '../../shared/application/usecase.repository';
import { UserModel } from '../domain/user.model';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import yenv from 'yenv';

const env = yenv();

export class UserUseCase extends UseCaseRepository<UserModel, UserRepository> {
  constructor(
    public operation: UserRepository,
    public operationRole: RoleRepository
  ) {
    super(operation);
  }

  async list(
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<Result<UserModel>> {
    const response: any = await this.operation.list(where, relations, order);

    response.payload.data.forEach(
      (data: any) => (data.photo = `${env.AWS.BUCKET.PATH}${data.photo}`)
    );

    return response;
  }

  async insertCipher(entity: UserModel) {
    entity.password = await UserService.cryptPassword(entity.password);
    entity.refreshToken = UserService.generateRefreshToken();

    const listRoles: any[] = [];
    entity.roles.forEach((role) => {
      listRoles.push(this.operationRole.getOne({ id: role }, []));
    });

    const roles = await Promise.all(listRoles);
    entity.roles = roles;

    return this.operation.insertCipher(entity);
  }
}
