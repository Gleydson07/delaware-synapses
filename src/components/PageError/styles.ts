import styled from "styled-components";

export const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 160px);

  & > p {
    color: red;
  }
`;
