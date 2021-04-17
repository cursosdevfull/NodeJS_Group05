import { Result } from './result.interface';

export interface RepositoryBase<T> {
  list(): Result<T[]>;
  listOne(entity: T): Result<T>;
  listByPage(page: number): Result<T[]>;
  insert(entity: T): Result<T>;
  update(entity: T): Result<T>;
  remove(entity: T): Result<T>;
}
