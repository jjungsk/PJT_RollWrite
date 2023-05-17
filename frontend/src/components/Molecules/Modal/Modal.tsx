import React from "react";
import { ModalBackground, ModalContainer } from "./style";
import Btn from "../../Atom/Btn/Btn";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  width: string;
  height: string;
  children?: React.ReactNode;
  type?: string;
  color?: string;
}
function Modal({ setIsOpen, width, height, children, type, color }: Props) {
  const handelClickCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      <ModalBackground onClick={handelClickCancel} />
      <ModalContainer width={width} height={height} color={color}>
        {children}
        {type === "btn" && (
          <>
            <Btn label="취소" margin="8px" onClick={handelClickCancel} />
            <Btn
              color="fill"
              label="확인"
              margin="8px"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </ModalContainer>
    </>
  );
}

export default Modal;
