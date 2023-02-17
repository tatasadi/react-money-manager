export interface EditInputModalState {
  open: boolean;
  inputValue: string;
  onSaveCallback: () => void;
}

export enum EditInputModalActions {
  Open,
  Close,
  UpdateInput,
  setOnSaveCallback,
}

export default function editInputModalReducer(
  state: EditInputModalState,
  action
) {
  switch (action.type) {
    case EditInputModalActions.Open:
      return { ...state, open: true };
    case EditInputModalActions.Close:
      return { ...state, open: false };
    case EditInputModalActions.UpdateInput:
      return { ...state, inputValue: action.payload };
    case EditInputModalActions.setOnSaveCallback:
      return {
        ...state,
        onSaveCallback: action.payload(state.inputValue),
      };
    default:
      throw new Error("Unhandled EditINputModal action " + action.type);
  }
}
