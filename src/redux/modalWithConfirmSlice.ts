import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalWithConfirmOperations } from "../models/ModalWithConfirmOperations";
import { ModalWithConfirmTypes } from "../models/ModalWithConfirmTypes";
import { ModalWithConfirm } from "../models/ModelWithConfirm";

export interface ModalWithConfirmState {
  open: boolean;
  title: string;
  text: string;
  actionButtonText: string;
  operation?: ModalWithConfirmOperations;
  confirmed: boolean;
  type?: ModalWithConfirmTypes;
}

let initialState: ModalWithConfirmState = {
  open: false,
  title: "",
  text: "",
  actionButtonText: "",
  confirmed: false,
};

export const ModalWithConfirmSlice = createSlice({
  name: "modalWithConfirm",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<ModalWithConfirm>) => {
      state.open = true;
      state.title = action.payload.title;
      state.text = action.payload.text;
      state.actionButtonText = action.payload.actionButtonText;
      state.operation = action.payload.operation;
      state.confirmed = false;
      state.type = action.payload.type;
    },

    close: (state) => {
      state.open = false;
    },

    setConfirmed: (state, action: PayloadAction<boolean>) => {
      state.confirmed = action.payload;
    },
  },
});

export const { open, close, setConfirmed } = ModalWithConfirmSlice.actions;

export default ModalWithConfirmSlice.reducer;
