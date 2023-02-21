import { ModalOperations } from "./ModalOperations";
import { ModalTypes } from "./ModalTypes";

export interface Modal {
  title: string;
  text: string;
  actionButtonText: string;
  operation?: ModalOperations;
  type?: ModalTypes;
  hasInput: boolean;
  inputValue?: string;
}
