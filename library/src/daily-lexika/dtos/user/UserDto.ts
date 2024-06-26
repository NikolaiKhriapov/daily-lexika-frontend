import { Language } from '../../enumerations/Language';
import { RoleName } from '../../enumerations/RoleName';
import { RoleStatisticsDto } from './RoleStatisticsDto';

export interface UserDto {
  id?: number;
  name?: string;
  email?: string;
  role?: RoleName;
  roleStatistics?: RoleStatisticsDto[];
  translationLanguage?: Language;
  interfaceLanguage?: Language;
  dateOfRegistration?: string;
}
