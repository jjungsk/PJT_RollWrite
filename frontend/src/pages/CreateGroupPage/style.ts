import styled from "styled-components";

const Title = styled.div`
  text-align: start;
  font-size: 24px;
  font-weight: bold;
  padding: 32px 40px;

  @media (height < 700px) {
    padding: 16px 40px;
  }
`;
const GroupNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 40px;
  gap: 4px;

  @media (height < 700px) {
    padding: 8px 40px;
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
const ThemaBox = styled.input<{ color: string }>`
  display: flex;
  width: 56px;
  height: 56px;

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

export {
  GroupNameContainer,
  GroupInput,
  ThemaSelect,
  ThemaBox,
  GroupSelectTag,
  Title,
};
