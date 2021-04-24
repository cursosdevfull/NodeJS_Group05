import { Result } from './result.interface';

export interface RepositoryBase<T> {
  list(): Result<T[]>;
  listOne(entity: Partial<T>): Result<T>;
  listByPage(page: number): Result<T[]>;
  insert(entity: Partial<T>): Result<T>;
  update(entity: Partial<T>): Result<T>;
  remove(entity: Partial<T>): Result<T>;
}
