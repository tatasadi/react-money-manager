import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { transactionsInitialState } from "./initialState";

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
  },
});

export const { updateSelectedTab } = transactionsSlice.actions;

export default transactionsSlice.reducer;
