import { Transaction } from "./Transaction";

interface TransactionModal {
  open: boolean;
  currentTransaction?: Transaction;
}

export interface TransactionsState {
  selectedTab: string;
  modal: TransactionModal;
  transactions: Transaction[];
}
