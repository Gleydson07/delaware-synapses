import styled from "styled-components";

export const WrapperContainer = styled.div`
  height: auto;
  max-height: calc(100vh - 120px);
  width: 100%;
  border: 2px solid #7f7f7f;
  border-radius: 0.75rem;
  padding: 18px;
  margin-top: 14px;
  background-color: #f2f2f2;
  overflow: hidden auto;

  @media(max-width: 768px){
    max-height: none;
  }

  &::-webkit-scrollbar {
    width: 0.75rem;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0.75rem transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #C2C2C2;
    border-radius: 0.75rem;
  }

  .wrapper-title{
    font-size: 22px;
    color: #727272;
    margin-bottom: 10px;
  }
`;
