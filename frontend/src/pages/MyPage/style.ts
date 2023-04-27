import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  width: 340px;
  height: 190px;
  padding: 36px 30px;
  margin: auto;
  background-size: cover;
`;

const ProfileImg = styled.div<{ size: number; bgImg: string }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-color: var(--gray-color);
`;

const ProfileInfo = styled.div`
  width: 160px;
  margin-left: 10px;
  text-align: center;

  & > p {
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    padding-block: 10px;
  }
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

const GroupListContainer = styled.div`
  width: 100%;
  height: calc(100vh - 360px);
  overflow-y: scroll;

  & > div {
    width: fit-content;
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
  ProfileInfo,
  ProfileInfoDetail,
  GroupListContainer,
};
