import styled from "styled-components";

const CardContainer = styled.div<{
  width: string;
  margin: string;
  color?: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  padding: 16px 16px 12px;
  background-color: ${(props) => props.color};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  margin: ${(props) => props.margin};
  gap: 8px;
`;

const TagContainer = styled.div`
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

export { CardContainer, TagContainer, Title, SubTitle, People, HorizontalBtn };
