import styled from "styled-components";

const SelectTagContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const SelectTagBtn = styled.button<{ isTagged: boolean }>`
  min-width: 80px;
  font-weight: bold;
  padding: 12px;
  margin: 12px 8px;
  border-radius: 16px;
  border: ${(props) =>
    props.isTagged
      ? "2px solid var(--main-color)"
      : "2px solid var(--black-color)"};
  background-color: ${(props) => (props.isTagged ? "var(--main-color)" : "")};
  color: ${(props) => (props.isTagged ? "var(--white-color)" : "")};
  font-size: 16px;
`;

export { SelectTagContainer, SelectTagBtn };
