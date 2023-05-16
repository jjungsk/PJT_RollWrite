import styled from "styled-components";

const ModalContainer = styled.div<{
  width: string;
  height: string;
  color?: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 16px;
  background-color: ${(props) =>
    props.color === "fill" ? "var(--main-color)" : "var(--white-color)"};
  color: ${(props) =>
    props.color === "fill" ? "var(--white-color)" : "var(--main-color)"};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  padding: 16px;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--black-color);
  opacity: 0.7;
  overflow: hidden;
  z-index: 999;
`;

export { ModalContainer, ModalBackground };
