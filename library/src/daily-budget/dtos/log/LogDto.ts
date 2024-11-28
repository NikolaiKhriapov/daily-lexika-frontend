import { LogAction } from '../../enumerations/LogAction';

export interface LogDto {
  id: number;
  userId: number;
  userEmail: string;
  action: LogAction;
  timestamp: string;
  comment: string;
}
