import styled from "styled-components";

const TextAreaContainer = styled.textarea`
  margin: auto;
  width: 300px;
  height: 40vh;
  background: var(--lightgray-color);
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  padding: 15px;
  font-size: 16px;
  margin-block: 15px;
  @media (height < 700) {
    height: 30vh;
  }
`;

export { TextAreaContainer };
