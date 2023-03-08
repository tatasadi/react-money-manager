import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../models/Transaction";
import { transactionsInitialState } from "./initialState";
import { v4 as uuidv4 } from "uuid";

const initialState = transactionsInitialState;

try {
  const transactionsInLocalStorage = JSON.parse(
    localStorage.getItem("transactions") as string
  );
  if (transactionsInLocalStorage) {
    initialState.transactions = transactionsInLocalStorage;
  }
} catch {
  console.error("The transactions could not be parsed into JSON.");
}

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    updateSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
    openModalForCreate: (state) => {
      state.modal.open = true;
      state.modal.currentTransaction = undefined;
    },
    openModalForUpdate: (state, action: PayloadAction<Transaction>) => {
      state.modal.open = true;
      state.modal.currentTransaction = action.payload;
    },
    closeModal: (state) => {
      state.modal.open = false;
    },
    createTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions = [
        ...state.transactions,
        { ...action.payload, id: uuidv4() },
      ];
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions = state.transactions.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },
    setFilterDate: (state, action: PayloadAction<string>) => {
      state.filterDate = action.payload;
    },
  },
});

export const {
  updateSelectedTab,
  createTransaction,
  openModalForCreate,
  openModalForUpdate,
  closeModal,
  updateTransaction,
  deleteTransaction,
  setFilterDate,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
