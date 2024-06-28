import { LogAction } from '../../enumerations/LogAction';
import { Platform } from '../../enumerations/Platform';

export interface LogDto {
  id: number;
  userId: number;
  userEmail: string;
  action: LogAction;
  platform: Platform;
  timestamp: string;
  comment: string;
}
