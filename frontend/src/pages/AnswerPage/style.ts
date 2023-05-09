import styled, { css } from "styled-components";

const NameContainer = styled.div`
  width: 100%;
  height: 4vh;
  margin: auto;
  font-size: 20px;
  color: var(--darkgray-color);
`;

const QuestionDiv = styled.div`
  width: 100%;
  margin: 15px 0;
  padding: 0 15px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 25px;
`;

const ContentContainer = styled.textarea`
  margin: auto;
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

const ToastModal = styled.textarea`
  background-color: white;
`;
export { NameContainer, QuestionDiv, ContentContainer, ToastModal };
