import { Platform } from '../../enumerations/Platform';

export interface AuthenticationRequest {
  email: string;
  password: string;
  platform: Platform;
}
