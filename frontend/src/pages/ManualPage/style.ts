import styled from "styled-components";

const ManualIcon = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: var(--lightgray-color);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  font-weight: bold;
  font-size: 34px;
  align-items: center;
  justify-content: center;
  color: var(--darkgray-color);
`;

const ManualWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0ede6;

  & > div:nth-child(2) {
    margin-top: 4px;
    padding: 0 8px;
  }
`;

const ManualContainer = styled.div`
  width: 100%;
  height: calc(100% - 68px);
  font-weight: bold;
  overflow: scroll;

  & > svg {
    width: 240px;
    height: fit-content;
    margin: 15px auto;
  }
  & > svg:nth-child(2) {
    width: 200px;
    margin: 20px auto;
  }
`;

const ManualSubTitle = styled.div`
  font-size: 20px;
  line-height: 28px;
`;

const ManualImg = styled.img`
  width: calc(100% - 10px);
  margin: 40px auto 20px;
  border-radius: 5px;
`;

const ManualStepBox = styled.div`
  display: flex;
  width: 340px;
  font-size: 14px;
  line-height: 22px;
  text-align: left;
  margin: 30px auto;

  @media all and (min-width: 380px) {
    width: 380px;
    font-size: 15px;
    line-height: 24px;
  }
`;

const ManualStep = styled.div`
  width: 46px;

  @media all and (min-width: 380px) {
    width: 52px;
  }
`;

const ManualStepText = styled.div`
  & > div:nth-child(2) {
    font-size: 11px;
    line-height: 12px;
    margin-top: 6px;
  }
  & > div:nth-child(3) {
    margin-top: 6px;
  }

  @media all and (min-width: 380px) {
    & > div:nth-child(2) {
      font-size: 13px;
      line-height: 16px;
      margin-top: 8px;
    }
    & > div:nth-child(3) {
      margin-top: 8px;
    }
  }
`;

export {
  ManualIcon,
  ManualWrap,
  ManualContainer,
  ManualSubTitle,
  ManualImg,
  ManualStepBox,
  ManualStep,
  ManualStepText,
};
