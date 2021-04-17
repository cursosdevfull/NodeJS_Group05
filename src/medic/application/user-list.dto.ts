import { UserModel } from '../domain/user.model';

export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  roles: any;
  photo: string;
}
const mappingUserDto = (user: UserModel): UserResponseDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  roles: user.roles,
  photo: user.photo,
});

export { mappingUserDto };
