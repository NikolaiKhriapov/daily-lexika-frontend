import { Platform } from '../types';

export interface AuthenticationRequest {
  email: string;
  password: string;
  platform: Platform;
}
