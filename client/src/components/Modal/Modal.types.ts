import { ReactElement } from "react";

export type ModalProps = {
	closeModal: () => void;
	children: ReactElement;
};