export interface EditInputModalState {
  open: boolean;
  inputValue: string;
  editCompleted: boolean;
}

export enum EditInputModalActions {
  Open,
  Close,
  UpdateInput,
  SetEditCompleted,
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
    case EditInputModalActions.SetEditCompleted:
      return {
        ...state,
        editCompleted: action.payload,
      };
    default:
      throw new Error("Unhandled EditINputModal action " + action.type);
  }
}
