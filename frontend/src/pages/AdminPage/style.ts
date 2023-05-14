import styled from "styled-components";

const AdminPageStatsSummary = styled.div`
  width: 350px;
  margin: 10px auto;
  font-size: 14px;
  font-weight: bold;
  background-color: white;
  padding: 10px 5px;
  border-radius: 10px;

  @media all and (min-width: 768px) {
    width: 650px;
    font-size: 24px;
    padding-inline: 10px;
  }
`;

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
  width: 350px;
  background-color: white;
  border-radius: 10px;
  margin: 25px auto;
  padding-block: 10px;

  @media all and (min-width: 768px) {
    width: 650px;
    margin-inline: 25px;
  }

  svg {
    width: fit-content;
    height: fit-content;
    cursor: default;
  }

  & > div:first-child {
    font-size: 18px;
    font-weight: bold;
    padding-block: 6px 12px;

    @media all and (min-width: 768px) {
      font-size: 24px;
      padding-block: 12px;
    }
  }

  & > div:last-child {
    margin-inline: auto;
  }
`;

export {
  AdminPageStatsSummary,
  AdminPageWrapper,
  AdminPageTitle,
  AdminPageChartWrap,
  AdminPageChartContainer,
};
