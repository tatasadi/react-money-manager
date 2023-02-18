export interface EditInputModalState {
  open: boolean;
  title: string;
  operation: EditInputModalOperations;
  inputValue: string;
  editCompleted: boolean;
}

export enum EditInputModalActions {
  Open,
  Close,
  UpdateInput,
  SetEditCompleted,
}

export enum EditInputModalOperations {
  AddCategory,
  EditCategory,
}

export default function editInputModalReducer(
  state: EditInputModalState,
  action
) {
  switch (action.type) {
    case EditInputModalActions.Open:
      return {
        ...state,
        open: true,
        title: action.payload.title,
        operation: action.payload.operation,
        inputValue: action.payload.inputValue,
      };
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
