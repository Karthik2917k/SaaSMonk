import { Fragment } from "react";
import { IoIosClose } from "react-icons/io";
import { ModalProps } from "./Modal.types";

export default function Modal(props: ModalProps) {
  const { closeModal } = props;
  return (
    <Fragment>
      <div className="fixed left-0 top-0 z-20 flex h-screen w-full select-none items-center justify-center bg-slate-800 bg-opacity-50">
        <div className="h-max  max-h-[calc(100%-50px)] w-full overflow-y-scroll whitespace-pre-wrap border-2 border-[#ccd7e0] bg-white p-4 md:mt-5 w-max">
          <div>
            <p
              className="ml-auto w-max cursor-pointer border"
              onClick={closeModal}
            >
              <IoIosClose size="35px" />
            </p>
            <div>{props.children}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
