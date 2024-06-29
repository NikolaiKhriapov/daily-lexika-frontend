import { CurrencyCode } from "../../enumerations/CurrencyCode";
import { ExpenseCategory } from '../../enumerations/ExpenseCategory';

export interface ExpenseOperationDto {
  id?: number;
  userId?: number;
  amount: string;
  currencyCode: CurrencyCode;
  accountFromId: number;
  category: ExpenseCategory;
  timestamp: string;
  comment: string;
}
