import styled from "styled-components";

const ChatContainer = styled.div`
  width: 90%;
  padding: 10px;
  margin-inline: auto;
  word-break: keep-all;
  clear: both;
`;

const QuestionContainer = styled.div<{ bgColor: string }>`
  width: 100%;
  padding: 8px 20px;
  margin: 16px auto;
  transform: skew(-10deg);
  background: ${(props) =>
    props.bgColor ? props.bgColor : "var(--blue-color)"};
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  font-weight: bold;
  font-size: 15px;
  line-height: 21px;
`;

const AnswerContainer = styled.div<{ isMe: boolean }>`
  display: flex;
  width: 100%;
  height: fit-content;
  float: ${(props) => (props.isMe ? "right" : "left")};

  & > div:first-child {
    width: 40px;
    height: 40px;
  }
`;

const AnswerDetail = styled.div`
  width: calc(90% - 40px);
  color: var(--black-color);

  & > div:first-child {
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
  }

  & > div:last-child {
    display: flex;

    & > div:first-child {
      width: 240px;
      padding: 6px 10px;
      border-radius: 10px;
      background-color: var(--lightgray-color);
      font-size: 12px;
      line-height: 15px;
    }

    & > div:last-child {
      font-size: 8px;
      line-height: 10px;
    }
  }
`;

export { ChatContainer, QuestionContainer, AnswerContainer, AnswerDetail };
