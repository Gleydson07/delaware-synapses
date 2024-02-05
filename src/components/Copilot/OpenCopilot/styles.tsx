import { styled } from "styled-components";

export const CopilotContainer = styled.div`
  position: fixed;
  bottom: 6px;
  right: 23px;
  display: inline-flex;
  flex-direction: column;
  max-width: 400px;
  min-width: 400px;
  height: 540px;
  padding: 0.5rem;
  background-color: #f2f2f2;
  border-radius: 6px;
  border: 1px solid #C42828;
  z-index: 100;
`;

export const CopilotHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.75rem;
  cursor: pointer;

  .copilot-header-img {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    & > p {
      font-size: 24px;
      font-weight: 700;
      color: #c42828;
    }
  }
`;

export const CopilotChat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid red;
  border: 2px solid #bfbfbf;
  background-color: #ffffff;
  border-radius: 0.5rem;
  height: 100%;
  padding: 10px;
  overflow: auto;

  .mensage-mind {
    display: flex;
    gap: 10px;
    width: 90%;
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 0.5rem;
  }

  .mensage-user {
    display: flex;
    justify-content: space-between;
    align-self: flex-end;
    width: 90%;
    padding: 10px;
    color: white;
    border-radius: 0.5rem;
    background-color: #000000;
  }
`;

export const CopilotFoter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;

  & > form {
    display: flex;
    width: 100%;
    min-height: 30px;
    font-size: 0.75rem;
    line-height: 1rem;
    border: 2px solid #bfbfbf;
    border-radius: 0.375rem;
    outline: 2px solid transparent;
    outline-offset: 2px;
    background: white;

    & > input {
      flex: 1;
      padding-left: 0.75rem;
      border: none;
      background: none;
      outline: none;
    }

    & > button {
      border: none;
      padding: 5px;
      background: none;
    }
  }
`;
