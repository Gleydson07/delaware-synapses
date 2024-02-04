import { styled } from "styled-components";

interface StatusContainerProps {
  $color: string,
  $bgColor: string,
}

export const StatusContainer = styled.span<StatusContainerProps>`
  display: inline-block;
  position: relative;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${props => props.$color};

  &::after{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30%;
    height: 30%;
    border-radius: 50%;
    background: ${props => props.$bgColor};
    transform: translate(-50%, -50%);
  }
`;