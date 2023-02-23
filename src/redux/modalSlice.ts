import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Modal } from "../models/Modal";
import { modalInitialState as initialState } from "./initialState";

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<Modal>) => {
      state.open = true;
      state.title = action.payload.title;
      state.text = action.payload.text;
      state.actionButtonText = action.payload.actionButtonText;
      state.operation = action.payload.operation;
      state.confirmed = false;
      state.type = action.payload.type;
      state.hasInput = action.payload.hasInput;
      if (action.payload.hasInput) {
        state.inputValue = action.payload.inputValue;
      }
    },

    close: (state) => {
      state.open = false;
    },

    setConfirmed: (state, action: PayloadAction<boolean>) => {
      state.confirmed = action.payload;
    },

    updateInput: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
});

export const { open, close, setConfirmed, updateInput } = ModalSlice.actions;

export default ModalSlice.reducer;
