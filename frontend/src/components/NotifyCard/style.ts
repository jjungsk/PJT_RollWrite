import styled, { css } from "styled-components";

const NotifyCardContainer = styled.div<{
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
}>`
  ${({ height, width, padding, margin }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: ${padding || "0px"};
    margin: ${margin || "0px"};

    background-color: var(--main-color);
    border-radius: 10px;

    width: ${width || "300px"};
    height: ${height || "80px"};
  `}
`;
const NotifyCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 12px;
  gap: 8px;

  font-size: 12px;
  color: var(--lightgray-color);

  width: 100%;
  height: 24px;
`;

const NotifyCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 12px;

  width: 100%;
  height: calc(100% - 24px);

  font-size: 16x;
  color: var(--white-color);
  text-align: start;
`;

export { NotifyCardHeader, NotifyCardContent, NotifyCardContainer };
