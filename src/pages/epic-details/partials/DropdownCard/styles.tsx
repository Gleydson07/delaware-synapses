import { styled } from "styled-components";

interface DropDownContainerProps {
  $isOpen: boolean;
  $color: string;
}

export const DropDownContainer = styled.div<DropDownContainerProps>`
  width: 100%;
  margin-bottom: 10px;

  .phases-dropdown-title {
    & > button {
      display: flex;
      align-items: center;
      gap: 5px;
      background: none;
      border: none;

      & > h2 {
        text-transform: uppercase;
        color: ${(props) => props.$color};
      }
    }
  }

  .dropdown {
    display: ${(props) => (props.$isOpen ? "block" : "none")};
    position: absolute;
    height: auto;
    max-height: 280px;
    width: 100%;
    padding: 16px;
    border: 1px solid #9e9e9e;
    background-color: #f2f2f2;
    border-radius: 0.5rem;
    box-shadow: 1px 4px 13px 4px #888;
    overflow: auto;
    z-index: 100;
  }
`;
