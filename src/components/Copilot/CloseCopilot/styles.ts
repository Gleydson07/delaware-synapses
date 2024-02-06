import { styled } from "styled-components";

export const CopilotContainer = styled.div`
 position: fixed;
  bottom: 6px;
  right: 23px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border: 1px solid red;
  border-radius: 6px;
  opacity: 0.8;
  background-color: #f2f2f2;
  cursor: pointer;
  z-index: 100;

  & > p {
    color: #c42828;
    font-weight: 700;
  }
`;
