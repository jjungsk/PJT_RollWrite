import styled from "styled-components";

const TextContainer = styled.div`
  margin: auto;
`;

const ContentContainer = styled.textarea`
  width: 300px;
  height: 40vh;
  background: var(--lightgray-color);
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: none;
  padding: 15px;
  font-size: 16px;
  margin-block: 15px;
`;

export { TextContainer, ContentContainer };
