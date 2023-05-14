import styled from "styled-components";

const ChatContainer = styled.div`
  width: 90%;
  padding: 10px;
  margin: 8px auto;
  word-break: keep-all;
`;

const QuestionContainer = styled.div<{ width?: string; bgColor: string }>`
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 8px 20px;
  margin: 16px auto;
  transform: skew(-10deg);
  background: ${(props) =>
    props.bgColor ? props.bgColor : "var(--blue-color)"};
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
`;

const QuestionItem = styled.div<{ bgColor: string }>`
  width: 100%;
  padding: 8px 20px;
  margin: 16px auto;
  background: ${(props) =>
    props.bgColor ? props.bgColor : "var(--blue-color)"};
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
`;

const AnswerContainer = styled.div<{ isMe: boolean }>`
  display: flex;
  width: 100%;
  height: fit-content;
  margin-block: 20px;
  justify-content: ${(props) => (props.isMe ? "right" : "left")};
`;

const AnswerDetail = styled.div<{ isMe: boolean }>`
  width: calc(90% - 40px);
  margin-inline: 8px;
  color: var(--black-color);

  & > div:first-child {
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    margin: 3px 6px;
    float: ${(props) => (props.isMe ? "right" : "left")};
  }

  & > div:last-child {
    display: flex;
    justify-content: ${(props) => (props.isMe ? "right" : "left")};
    clear: both;
    align-items: end;
  }
`;

const AnswerContent = styled.div`
  max-width: 240px;
  padding: 6px 10px;
  border-radius: 10px;
  background-color: var(--lightgray-color);

  & > img {
    width: 96%;
    height: auto;
    margin-block: 8px;
    border-radius: 5px;
  }

  & > div {
    font-size: 12px;
    line-height: 15px;
    text-align: left;
    word-wrap: break-word;
    overflow: hidden;
  }
`;

const AnswerDate = styled.div`
  font-size: 8px;
  line-height: 10px;
  margin-inline: 4px;
`;

export {
  ChatContainer,
  QuestionContainer,
  QuestionItem,
  AnswerContainer,
  AnswerDetail,
  AnswerContent,
  AnswerDate,
};
