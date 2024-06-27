import { Platform } from '../../enumerations/Platform';

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
  platform: Platform;
}
