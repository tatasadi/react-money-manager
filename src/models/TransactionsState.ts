import { Transaction } from "./Transaction";

export interface TransactionsState {
  selectedTab: string;
  transactions: Transaction[];
}
