import { Result } from '../../shared/application/result.interface';
import { UserModel } from '../domain/user.model';
import { UserRepository } from './user.repository';

export class UserUseCase {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  list(): Result<UserModel[]> {
    const result: Result<UserModel[]> = this.userRepository.list();
    return result;
  }

  listOne(user: UserModel): Result<UserModel> {
    const result: Result<UserModel> = this.userRepository.listOne(user);
    return result;
  }

  listByPage(page: number): Result<UserModel[]> {
    const result: Result<UserModel[]> = this.userRepository.listByPage(page);
    return result;
  }

  insert(user: UserModel): Result<UserModel> {
    const result: Result<UserModel> = this.userRepository.insert(user);
    return result;
  }

  update(user: UserModel): Result<UserModel> {
    const result: Result<UserModel> = this.userRepository.update(user);
    return result;
  }

  remove(user: UserModel): Result<UserModel> {
    const result: Result<UserModel> = this.userRepository.remove(user);
    return result;
  }
}
