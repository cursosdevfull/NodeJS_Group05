/// Dominio
interface UserEntity {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  password: string;
}

interface DriverEntity {
  name: string;
  lastname: string;
}

// Aplicacion
interface UserResponseDto {
  name: string;
  lastname: string;
  cmp: string;
}
const mappingUserDto = (user: UserEntity): UserResponseDto => ({
  name: user.name,
  lastname: user.lastname,
  cmp: user.cmp,
});

interface Result<T> {
  trace: string;
  payload: {
    data: T;
  };
}

interface RepositoryBase<T> {
  insert(user: T): Result<T>;
  update(user: T): Result<T>;
  list(): Result<T[]>;
  remove(user: T): Result<T>;
}

abstract class UserAbstract {
  abstract userExists(user: UserEntity): UserEntity;
}

class UserUseCase {
  userRepository: RepositoryBase<UserEntity>;

  constructor(userRepository: RepositoryBase<UserEntity>) {
    this.userRepository = userRepository;
  }

  insert(user: UserEntity) {
    const result: Result<UserEntity> = this.userRepository.insert(user);
  }
}

// Infraestructura
class UserOperation extends UserAbstract implements RepositoryBase<UserEntity> {
  insert(user: UserEntity): Result<UserEntity> {
    const trace: string = this.getTrace();
    const data: UserEntity = this.process(user);
    return { trace, payload: { data } };
  }

  update(user: UserEntity): Result<UserEntity> {
    const trace: string = this.getTrace();
    const data: UserEntity = this.process(user);
    return { trace, payload: { data } };
  }

  list(): Result<UserEntity[]> {
    const trace: string = this.getTrace();
    const data: UserEntity[] = [];
    return { trace, payload: { data } };
  }

  remove(user: UserEntity): Result<UserEntity> {
    const trace: string = this.getTrace();
    const data: UserEntity = this.process(user);
    return { trace, payload: { data } };
  }

  userExists(user: UserEntity): UserEntity {
    return user;
  }

  process(user: UserEntity): UserEntity {
    return user;
  }

  getTrace(): string {
    return 'abc234557.ghc';
  }
}
