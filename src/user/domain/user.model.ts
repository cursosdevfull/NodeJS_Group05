export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  refreshToken: string;
  roles: any;
  photo: string;
}