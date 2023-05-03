import styled from "styled-components";

const SettingContainer = styled.div`
  width: calc(100% - 60px);
  margin-inline: auto;
  color: var(--black-color);
`;

const SettingSection = styled.div`
  margin-block: 24px;
  text-align: left;
`;

const SettingSectionTitle = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: var(--darkgray-color);
`;

const SettingMenuItem = styled.div`
  position: relative;
  width: 100%;
  justify-content: left;
  align-items: center;
  padding-block: 16px;
  border-bottom: 1px solid var(--darkgray-color);

  & > span {
    position: absolute;
    top: 50%;
    right: 0;
  }

  & > svg {
    position: absolute;
    top: 50%;
    right: 0;
    width: 24px;
    height: 24px;
    transform: translate(0, -50%) rotate(180deg);
    cursor: pointer;
  }

  & > div:last-child {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: var(--darkgray-color);
  }
`;

const SettingMenuItemText = styled.div`
  width: 200px;
  font-size: 20px;
  line-height: 24px;

  & > div {
    font-size: 12px;
    line-height: 15px;
    color: var(--darkgray-color);
  }
`;

const SettingBtnContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);

  & > div {
    margin: 3vh 10px 0;

    button {
      width: 160px;
      height: 52px;
    }
  }

  @media (height < 700px) {
    display: flex;
    justify-content: center;

    & > div > button {
      width: 140px;
      height: 48px;
    }
  }
`;

export {
  SettingContainer,
  SettingSection,
  SettingSectionTitle,
  SettingMenuItem,
  SettingMenuItemText,
  SettingBtnContainer,
};
