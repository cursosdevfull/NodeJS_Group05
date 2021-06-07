import * as httpMock from 'node-mocks-http';
import { UserController } from '../../src/user/adapter/user.controller';
import { UserOperation } from '../../src/user/infraestructure/user.operation';
import { RoleOperation } from '../../src/role/infraestructure/role.operation';
import { UserUseCase } from '../../src/user/application/user.usecase';
import mockListUsers from '../mocks/operation-list.json';
import mockListOneUser from '../mocks/operation-list-one.json';
import mockUserCipher from '../mocks/operation-insert-cipher.json';

let req: any, res: any, next;

describe('user.controller', () => {
  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
  });

  it('list', async () => {
    (UserOperation as jest.Mock) = jest.fn();
    (RoleOperation as jest.Mock) = jest.fn();

    (UserUseCase as jest.Mock) = jest.fn().mockReturnValue({
      list: jest.fn().mockReturnValue(mockListUsers),
    });

    const userCase = new UserUseCase(new UserOperation(), new RoleOperation());

    const controller = new UserController(userCase);
    await controller.list(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockListUsers);
  });

  it('listOne', async () => {
    (UserOperation as jest.Mock) = jest.fn();
    (RoleOperation as jest.Mock) = jest.fn();

    (UserUseCase as jest.Mock) = jest.fn().mockReturnValue({
      listOne: jest.fn().mockReturnValue(mockListOneUser),
    });

    const userCase = new UserUseCase(new UserOperation(), new RoleOperation());

    const controller = new UserController(userCase);
    req.params.id = 1;
    await controller.listOne(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockListOneUser);
  });

  it('insert', async () => {
    (UserOperation as jest.Mock) = jest.fn();
    (RoleOperation as jest.Mock) = jest.fn();

    (UserUseCase as jest.Mock) = jest.fn().mockReturnValue({
      insertCipher: jest.fn().mockReturnValue(mockUserCipher),
    });

    const userCase = new UserUseCase(new UserOperation(), new RoleOperation());

    const controller = new UserController(userCase);
    req.body = {
      name: mockUserCipher.payload.data.name,
      email: mockUserCipher.payload.data.email,
      photo: 'avatar.jpg',
      password: '123',
      roles: [1, 2, 3],
    };
    await controller.insert(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockUserCipher);
  });
});
