/// Dominio
interface UserEntity {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  password: string;
  refreshToken: string;
}

interface DriverEntity {
  name: string;
  lastname: string;
}

interface MedicEntity {
  name: string;
  lastname: string;
}

interface HistoryEntity {
  numHistory: number;
  namePatient: string;
  medic: MedicEntity;
  driver: DriverEntity;
  user: UserEntity;
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

interface NotificationRepository {
  sent(
    emailRecipient: string,
    emailSender: string,
    subject: string,
    body: string,
    isHTML: boolean
  ): boolean;
}

interface UserRepository extends RepositoryBase<UserEntity> {
  userExists(user: UserEntity): UserEntity;
}

class TokensService {
  generateAccessToken() {}

  static generateRefreshToken(): string {
    return 'abc234557';
  }
}

class UserUseCase {
  userRepository: UserRepository;

  constructor(
    userRepository: UserRepository,
    private notificationRepository: NotificationRepository
  ) {
    this.userRepository = userRepository;
  }

  insert(user: UserEntity): Result<UserEntity> {
    const refreshToken = TokensService.generateRefreshToken();
    user.refreshToken = refreshToken;
    const result: Result<UserEntity> = this.userRepository.insert(user);
    this.notificationRepository.sent(
      'administrador@correo',
      'sergio@correo',
      'Nuevo registro',
      'Se registró Juan Perez',
      false
    );
    return result;
  }

  userExists(user: UserEntity): UserEntity {
    return this.userRepository.userExists(user);
  }
}

// Infraestructura
abstract class OperationRepository<T> {
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

  list(): Result<T[]> {
    const trace: string = this.getTrace();
    const data: T[] = [];
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

class NotificationEmail implements NotificationRepository {
  sent(
    emailRecipient: string,
    emailSender: string,
    subject: string,
    body: string,
    isHTML: boolean
  ): boolean {
    return true;
  }
}

class UserOperation
  extends OperationRepository<UserEntity>
  implements UserRepository {
  userExists(user: UserEntity): UserEntity {
    return user;
  }
}

// Controlador
const userOperation: UserRepository = new UserOperation();
const notificationEmail: NotificationEmail = new NotificationEmail();
const userUseCase: UserUseCase = new UserUseCase(
  userOperation,
  notificationEmail
);

class UserController {
  static insert(req: any, res: any = '') {
    userUseCase.insert(req.body);
  }
}

// Rutas
const req = {
  body: {
    name: 'Sergio',
    lastname: 'Hidalgo',
    email: 'sergio@correo.com',
    cmp: '03456',
    password: '12345',
  },
};

UserController.insert(req);
