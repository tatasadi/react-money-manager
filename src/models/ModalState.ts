import { ModalOperations } from "./ModalOperations";
import { ModalTypes } from "./ModalTypes";

export interface ModalState {
  open: boolean;
  title: string;
  text: string;
  actionButtonText: string;
  operation?: ModalOperations;
  confirmed: boolean;
  type?: ModalTypes;
  hasInput: boolean;
  inputValue?: string;
}
