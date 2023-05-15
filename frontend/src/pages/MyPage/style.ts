import styled from "styled-components";

const MyPageTabContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px 16px;

  & > div {
    gap: 24px;

    & > div {
      min-width: 75px;
    }
  }

  & > svg {
    position: absolute;
    top: 50%;
    right: 22px;
    transform: translate(0, -50%);
  }
`;

export { MyPageTabContainer };
