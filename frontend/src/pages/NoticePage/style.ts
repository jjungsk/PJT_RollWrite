import styled from "styled-components";

const NoticeContainer = styled.div`
  & > div > div > div {
    justify-content: left;
    text-align: left;
  }
`;

const NoticeDay = styled.div`
  font-size: 10px;
  line-height: 16px;
  margin-bottom: 9px;
  color: var(--darkgray-color);
`;

const NoticeContent = styled.div`
  font-size: 16px;
  line-height: 24px;
  margin-block: 9px;
  color: var(--black-color);
`;

export { NoticeContainer, NoticeDay, NoticeContent };
