import { RoleOperation } from '../../src/role/infraestructure/role.operation';
import { UserUseCase } from '../../src/user/application/user.usecase';
import { UserOperation } from '../../src/user/infraestructure/user.operation';
import { UserService } from '../../src/user/application/user.service';
import mockListUsers from '../mocks/operation-list.json';
import mockInsertUserCipher from '../mocks/operation-insert-cipher.json';
import mockRoleGetOne from '../mocks/role-getone.json';
import mockUser from '../mocks/user.json';

describe('user.usecase.ts', () => {
  it('list', async () => {
    (UserOperation as jest.Mock) = jest.fn().mockReturnValue({
      list: jest.fn().mockResolvedValue(mockListUsers),
    });

    const operationUser = new UserOperation();
    const operationRole = new RoleOperation();
    const userUseCase = new UserUseCase(operationUser, operationRole);

    const response = await userUseCase.list({}, [], {});
    expect(response).toHaveProperty('trace');
    expect(response).toHaveProperty('payload');
    expect(response).toHaveProperty('payload.data');
    expect(response.payload.data).not.toBeNull();
    expect(operationUser.list).toHaveBeenCalled();
    expect(operationUser.list).toHaveBeenCalledTimes(1);
    expect(operationUser.list).toHaveBeenCalledWith({}, [], {});
  });

  it('insertCipher', async () => {
    UserService.cryptPassword = jest
      .fn()
      .mockResolvedValue(
        '$2a$10$2S.2yWufeTwyd7BwtH9dh.NDh/9PUjeIjtxU4osANgKImjlbECPNO'
      );

    UserService.generateRefreshToken = jest
      .fn()
      .mockReturnValue('6aab9835-a6f4-4ec7-9193-69f6cc3e80f0');

    (UserOperation as jest.Mock) = jest.fn().mockReturnValue({
      insertCipher: jest.fn().mockResolvedValue(mockInsertUserCipher),
    });

    (RoleOperation as jest.Mock) = jest.fn().mockReturnValue({
      getOne: jest.fn().mockResolvedValue(mockRoleGetOne),
    });

    const operationUser = new UserOperation();
    const operationRole = new RoleOperation();
    const userUseCase = new UserUseCase(operationUser, operationRole);

    const response = await userUseCase.insertCipher(mockUser);
    expect(UserService.cryptPassword).toHaveBeenCalledTimes(1);
    expect(UserService.generateRefreshToken).toHaveBeenCalledTimes(1);
    expect(operationRole.getOne).toHaveBeenCalledTimes(3);
    expect(response).toEqual(mockInsertUserCipher);
  });
});
