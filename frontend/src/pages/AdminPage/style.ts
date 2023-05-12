import styled from "styled-components";

const AdminPageWrapper = styled.div`
  width: 100%;
  padding: 32px;
`;

const AdminPageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;

  @media all and (min-width: 768px) {
    font-size: 36px;
    padding-top: 32px;
  }
`;

const AdminPageChartWrap = styled.div`
  @media all and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const AdminPageChartContainer = styled.div`
  margin: 24px;

  svg {
    width: fit-content;
    height: fit-content;
    cursor: default;
  }

  & > div:first-child {
    font-size: 24px;
    font-weight: bold;
    padding-block: 12px;
  }

  & > div:last-child {
    margin-inline: auto;
  }
`;

export {
  AdminPageWrapper,
  AdminPageTitle,
  AdminPageChartWrap,
  AdminPageChartContainer,
};
