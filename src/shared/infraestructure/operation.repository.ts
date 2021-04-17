import { Result } from '../application/result.interface';

export abstract class OperationRepository<T> {
  list(): Result<T[]> {
    const trace: string = this.getTrace();
    const data: T[] = [];
    return { trace, payload: { data } };
  }

  listOne(): Result<T> {
    const trace: string = this.getTrace();
    let data: T;
    return { trace, payload: { data } };
  }

  listByPage(): Result<T[]> {
    const trace: string = this.getTrace();
    const data: T[] = [];
    return { trace, payload: { data } };
  }

  insert(entity: T): Result<T> {
    const trace: string = this.getTrace();
    const data: T = this.process(entity);
    return { trace, payload: { data } };
  }

  update(entity: T): Result<T> {
    const trace: string = this.getTrace();
    const data: T = this.process(entity);
    return { trace, payload: { data } };
  }

  remove(entity: T): Result<T> {
    const trace: string = this.getTrace();
    const data: T = this.process(entity);
    return { trace, payload: { data } };
  }

  process(entity: T): T {
    return entity;
  }

  getTrace(): string {
    return 'abc234557.ghc';
  }
}
