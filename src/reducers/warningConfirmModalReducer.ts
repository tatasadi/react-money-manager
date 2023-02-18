export interface WarningConfirmModalState {
  open: boolean;
  title: string;
  text: string;
  actionButtonText: string;
  operation: WarningConfirmModalOperations;
  confirmed: boolean;
}

export enum WarningConfirmModalActions {
  Open,
  Close,
  SetConfirmed,
}

export enum WarningConfirmModalOperations {
  DeleteCategory,
}

export default function warningConfirmModalReducer(
  state: WarningConfirmModalState,
  action
) {
  switch (action.type) {
    case WarningConfirmModalActions.Open:
      return {
        ...state,
        open: true,
        title: action.payload.title,
        text: action.payload.text,
        actionButtonText: action.payload.actionButtonText,
        operation: action.payload.operation,
        confirmed: false,
      };
    case WarningConfirmModalActions.Close:
      return { ...state, open: false };
    case WarningConfirmModalActions.SetConfirmed:
      return {
        ...state,
        confirmed: action.payload,
      };
    default:
      throw new Error("Unhandled EditINputModal action " + action.type);
  }
}
