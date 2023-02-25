import { Transaction } from "./Transaction";

export interface TransactionsState {
  selectedTab: string;
  modalOpen: boolean;
  transactions: Transaction[];
}
