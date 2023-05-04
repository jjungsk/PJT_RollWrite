import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  width: 340px;
  height: 190px;
  padding: 36px 30px;
  margin: auto;
  background-size: cover;
`;

const ProfileImg = styled.div<{
  size: number;
  bgImg?: string;
}>`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-image: ${(props) =>
    props.bgImg === "" || props.bgImg === null
      ? "url(/default_profile.jpg)"
      : `url(${props.bgImg})`};
  background-size: cover;
  background-position: center;
  background-color: var(--gray-color);
  margin: auto;
`;

const ProfileImgBG = styled.div<{ size: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-color: rgba(0, 0, 0, 0.55);
`;

const AddProfileImgBtn = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  & > svg {
    width: 50px !important;
    height: 50px !important;
    margin-top: 3px;
  }
`;

const ProfileInfo = styled.div`
  width: 160px;
  margin-left: 10px;
  text-align: center;

  button {
    height: 28px;
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
  }

  & > button {
    width: 100px;
  }
`;

const Nickname = styled.input.attrs((props) => ({
  disabled: props.disabled,
}))`
  width: 90%;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  align-self: center;
  color: var(--black-color);
  padding-block: 2px;
  border-bottom: ${(props) =>
    props.disabled ? "3px solid var(--lightgray-color)" : "3px solid #3A3A3A"};
`;

const ProfileInfoDetail = styled.div`
  font-weight: bold;
  font-size: 13px;
  line-height: 10px;

  svg {
    width: 16px;
    height: 20px;
    padding-top: 2px;
  }

  table {
    width: 150px;
    margin: 4px auto;

    tr {
      height: 28px;

      td {
        vertical-align: middle;
      }

      td:nth-child(2) {
        width: 80px;
      }

      td:last-child {
        width: 35px;
        font-weight: bold;
        font-size: 15px;
      }
    }
  }
`;

const EditProfileBtnContainer = styled.div`
  display: flex;
  justify-content: center;

  & > button {
    width: 62px;
    margin-inline: 6px;
  }
`;

const GroupListContainer = styled.div`
  width: 100%;
  height: calc(100vh - 360px);
  overflow-y: scroll;

  & > div {
    width: 100%;
    margin: auto;
  }

  & > div:first-child > div {
    margin-top: 10px;
  }

  & > div:last-child {
    width: 100%;
    height: calc(100vh - 480px);
  }
`;

export {
  ProfileContainer,
  ProfileImg,
  ProfileImgBG,
  AddProfileImgBtn,
  ProfileInfo,
  Nickname,
  ProfileInfoDetail,
  EditProfileBtnContainer,
  GroupListContainer,
};
