import { CategoryType } from "./CategoryType";

export interface Transaction {
  id: string;
  name: string;
  category: string;
  type: CategoryType;
  amount: number;
  date: string;
}
