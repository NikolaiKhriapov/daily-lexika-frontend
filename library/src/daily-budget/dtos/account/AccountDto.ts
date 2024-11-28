import { Color } from '../../enumerations/Color';

export interface AccountDto {
  id?: number;
  userId?: number;
  name: string;
  amount: string;
  currencyCode: string;
  color: Color;
  isActive?: boolean;
}
