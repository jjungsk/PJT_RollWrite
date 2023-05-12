import styled from "styled-components";

const InputLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
`;
const InputLineBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--black-color);
  height: 36px;
  width: 100%;
`;

const InputLineBoxInput = styled.input`
  font-size: 20px;
  font-weight: bold;
  line-height: 36px;
  width: 100%;
`;

const InputLineInfo = styled.p`
  font-weight: bold;
  font-size: 14px;
  color: red;
`;

export { InputLineContainer, InputLineBox, InputLineBoxInput, InputLineInfo };
