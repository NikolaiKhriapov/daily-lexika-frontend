export enum ExpenseCategory {
  FOOD = 'FOOD',
  ENTERTAINMENT = 'ENTERTAINMENT',
  TRANSPORT = 'TRANSPORT',
  HEALTH_HYGIENE = 'HEALTH_HYGIENE',
  CLOTHES = 'CLOTHES',
  COMMUNICATION = 'COMMUNICATION',
  HOUSE = 'HOUSE',
  OTHER = 'OTHER',
}

export const ExpenseCategoryName: Record<ExpenseCategory, string> = {
  [ExpenseCategory.FOOD]: 'Food',
  [ExpenseCategory.ENTERTAINMENT]: 'Entertainment',
  [ExpenseCategory.TRANSPORT]: 'Transport',
  [ExpenseCategory.HEALTH_HYGIENE]: 'Health & Hygiene',
  [ExpenseCategory.CLOTHES]: 'Clothes',
  [ExpenseCategory.COMMUNICATION]: 'Communication',
  [ExpenseCategory.HOUSE]: 'House',
  [ExpenseCategory.OTHER]: 'Other',
};
