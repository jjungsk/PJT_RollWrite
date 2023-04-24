import styled from "styled-components";

const TagContainer = styled.div`
  width: 60px;
  height: 20px;
  position: relative;
`;
const TagContent = styled.div`
  width: 60px;
  height: 20px;
  position: absolute;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  top: 0;
  left: 0;
  padding: 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { TagContainer, TagContent };
