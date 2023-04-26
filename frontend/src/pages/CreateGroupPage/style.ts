import styled from "styled-components";

const Title = styled.div`
  text-align: start;
  font-size: 24px;
  font-weight: bold;
  padding: 32px 40px;

  > p {
    font-size: 16px;
    font-weight: normal;
    margin-top: 12px;
  }

  @media (height < 700px) {
    padding: 16px 40px;
  }
`;
const GroupNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 40px;
  gap: 4px;

  @media (height < 700px) {
    padding: 12px 40px;
  }
`;
const GroupInput = styled.input`
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid var(--black-color);
  height: 36px;
  width: 100%;
`;
const ThemaSelect = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 12px;
`;
const ThemaBox = styled.button<{ color: string }>`
  display: flex;
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.color};
  border-radius: 16px;
`;

const GroupSelectTag = styled.div`
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid var(--black-color);
  height: 36px;
  width: 100%;
  margin-bottom: 32px;
`;

const TagListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const TagBtn = styled.button<{ isTagged: boolean }>`
  min-width: 80px;
  font-weight: bold;
  padding: 12px;
  margin: 8px 12px;
  border-radius: 16px;
  border: ${(props) =>
    props.isTagged
      ? "2px solid var(--main-color)"
      : "2px solid var(--black-color)"};
  background-color: ${(props) => (props.isTagged ? "var(--main-color)" : "")};
  color: ${(props) => (props.isTagged ? "var(--white-color)" : "")};
  font-size: 16px;
`;
export {
  GroupNameContainer,
  GroupInput,
  ThemaSelect,
  ThemaBox,
  GroupSelectTag,
  Title,
  TagListContainer,
  TagBtn,
};
