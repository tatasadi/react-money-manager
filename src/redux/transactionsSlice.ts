import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../models/Transaction";
import { transactionsInitialState } from "./initialState";
import { v4 as uuidv4 } from "uuid";

const initialState = transactionsInitialState;

try {
  const transactionsInLocalStorage = JSON.parse(
    localStorage.getItem("transactions")
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
    openModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
    createTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions = [
        ...state.transactions,
        { ...action.payload, id: uuidv4() },
      ];
    },
  },
});

export const { updateSelectedTab, createTransaction, openModal } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
