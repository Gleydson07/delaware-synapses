import { styled } from "styled-components";

export const CardDetails = styled.div`
  gap: 20px;
  width: 100%;
  padding: 1rem 0;
  background: white;
  border-radius: 0.5rem;
`;

export const CardProgressWrapper = styled.div`
  padding: 0 1rem;
`;

export const UsersContainer = styled.div`
  padding: 0 1rem 0.75rem 1rem;
`

export const UserContainerScroll = styled.div`
  margin-top: 0.5rem;
  max-height: 344px;
  overflow: hidden auto;

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0.25rem transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #C2C2C2;
    border-radius: 0.25rem;
  }
`;