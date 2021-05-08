import { RepositoryBase } from './base.repository';
import { Result } from './result.interface';

export class UseCaseRepository<T, U extends RepositoryBase<T>> {
  constructor(public operation: U) {}

  async list(
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<Result<T>> {
    return await this.operation.list(where, relations, order);
  }

  async listOne(
    where: object = {},
    relations: string[] = []
  ): Promise<Result<T>> {
    return await this.operation.listOne(where, relations);
  }

  async listByPage(
    page: number,
    pageSize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<Result<T>> {
    return await this.operation.listByPage(
      page,
      pageSize,
      where,
      relations,
      order
    );
  }

  async insert(entity: T): Promise<Result<T>> {
    return await this.operation.insert(entity);
  }

  async update(
    entity: T,
    where: object = {},
    relations: string[] = []
  ): Promise<Result<T>> {
    return await this.operation.update(entity, where, relations);
  }

  async remove(where: object): Promise<Result<T>> {
    return await this.operation.remove(where);
  }
}
