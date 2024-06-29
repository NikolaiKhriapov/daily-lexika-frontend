import { Language } from '../../enumerations/Language';

export interface UserDto {
  id?: number;
  email?: string;
  interfaceLanguage?: Language;
  dateOfRegistration?: string;
}
