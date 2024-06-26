import { Platform } from '../types';

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
  platform: Platform;
}
