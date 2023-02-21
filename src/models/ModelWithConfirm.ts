import { ModalWithConfirmOperations } from "./ModalWithConfirmOperations";
import { ModalWithConfirmTypes } from "./ModalWithConfirmTypes";

export interface ModalWithConfirm {
  title: string;
  text: string;
  actionButtonText: string;
  operation?: ModalWithConfirmOperations;
  type?: ModalWithConfirmTypes;
}
