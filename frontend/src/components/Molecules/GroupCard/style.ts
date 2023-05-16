import styled from "styled-components";

const GroupCardContainer = styled.div<{
  width?: string;
  height?: string;
  margin?: string;
  color?: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || "330px"};
  height: ${(props) => props.height || "112px"};
  padding: 12px 12px 8px;
  background-color: ${(props) => props.color};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  margin: ${(props) => props.margin || "auto"};
  gap: 8px;
`;

const GroupCardContent = styled.div`
  display: flex;
  gap: 8px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: start;
  width: 100%;
  height: 24px;
`;
const SubTitle = styled.div`
  font-size: 14px;
  color: var(--darkgray-color);
  text-align: start;
  width: 100%;
  height: 16px;
`;
const People = styled.div`
  display: flex;
  justify-content: center;

  width: 40px;
  height: 20px;
`;

const HorizontalBtn = styled.div`
  position: absolute;
  right: 16px;
  top: 4px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: bold;
  width: 50px;
  height: 40px;
`;

const GroupCardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top: 1px solid var(--gray-color);
  > div {
    color: var(--black-color);
    width: 50%;
    height: 24px;
    line-height: 24px;
  }
`;

export {
  GroupCardContainer,
  GroupCardContent,
  Title,
  SubTitle,
  People,
  HorizontalBtn,
  GroupCardFooter,
};
