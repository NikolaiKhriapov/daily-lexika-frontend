import { RoleName } from '../../enumerations/RoleName';

export interface UserDto {
  id?: number;
  name?: string;
  email?: string;
  role?: RoleName;
}
