import { getRepository, ObjectType, Repository } from 'typeorm';
import { Result } from '../application/result.interface';
import { OperationService } from './operation.service';
import * as _ from 'lodash';
import { ResponseDto } from '../../helper/response.dto';

export abstract class OperationRepository<T> {
  private entity: ObjectType<T>;

  constructor(entity: ObjectType<T>) {
    this.entity = entity;
  }

  async list(
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<Result<T>> {
    const trace: string = OperationService.getTrace();
    const repository: Repository<T> = getRepository(this.entity);
    const data: T[] = await repository.find({ where, relations, order });
    return ResponseDto.format(trace, data);
  }

  async listOne(
    where: object = {},
    relations: string[] = []
  ): Promise<Result<T>> {
    const trace: string = OperationService.getTrace();
    const repository: Repository<T> = getRepository(this.entity);
    const data: T = await repository.findOne({ where, relations });
    return ResponseDto.format(trace, data);
  }

  async listByPage(
    page: number,
    pageSize: number,
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<Result<T>> {
    const trace: string = OperationService.getTrace();
    const repository: Repository<T> = getRepository(this.entity);
    const [data, total] = await repository.findAndCount({
      where,
      relations,
      order,
      skip: page * pageSize,
      take: pageSize,
    });

    return ResponseDto.format(trace, data, total);
  }

  async insert(entity: T): Promise<Result<T>> {
    const trace: string = OperationService.getTrace();
    const repository: Repository<T> = getRepository(this.entity);
    const data: T = await repository.save(entity);
    return ResponseDto.format(trace, data);
  }

  async update(
    entity: T,
    where: object = {},
    relations: string[] = []
  ): Promise<Result<T>> {
    const trace: string = OperationService.getTrace();
    const repository: Repository<T> = getRepository(this.entity);
    let recordToUpdate = await repository.findOne({ where, relations });

    recordToUpdate = _.merge(recordToUpdate, entity);

    await repository.save(recordToUpdate);

    return ResponseDto.format(trace, recordToUpdate);
  }

  async remove(where: object): Promise<Result<T>> {
    const trace: string = OperationService.getTrace();
    const repository: Repository<T> = getRepository(this.entity);
    const recordToDelete: T = await repository.findOne(where);

    if (recordToDelete) {
      await repository.delete(where);
      return ResponseDto.format(trace, recordToDelete);
    }

    return null;
  }
}
