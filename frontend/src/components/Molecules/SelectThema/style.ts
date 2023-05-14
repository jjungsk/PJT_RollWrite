import styled from "styled-components";

const SelectThemaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
`;

const SelectThemaBoxContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 12px;
`;
const SelectThemaBox = styled.button<{ color: string }>`
  display: flex;
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.color};
  border-radius: 16px;
`;

export { SelectThemaContainer, SelectThemaBoxContainer, SelectThemaBox };
