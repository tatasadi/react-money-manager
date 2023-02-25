import { CategoryType } from "./CategoryType";

export interface Transaction {
  id: string;
  description: string;
  category: string;
  type: CategoryType;
  amount: number;
  date: string;
}
