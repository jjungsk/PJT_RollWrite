import styled from "styled-components";

const BackNavigationContainer = styled.div<{ justifyContent?: string }>`
  height: 48px;
  display: flex;
  justify-content: ${(props) => props.justifyContent || "space-between"};
  padding: 0px 16px;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 14px;
  gap: 12px;
`;

const BackNavigationTitle = styled.div<{ fontSize?: string }>`
  font-weight: bold;
  font-size: ${(props) => props.fontSize || "24px"};
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--black-color);
`;

export { BackNavigationContainer, BackNavigationTitle };
