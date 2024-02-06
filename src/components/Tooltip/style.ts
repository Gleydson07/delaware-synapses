import styled, { css } from "styled-components";

interface TooltipProps {
  $text: string
}

export const TooltipContainer = styled.div<TooltipProps>`
${props => Tooltip(props.$text)}
`
export const Tooltip = (props: string) =>
  props.length > 0 &&
  css`
    &::before {
      content: '${props}';
      position: absolute;
      white-space: nowrap;
      left: 50%;
      top: -50px;
      width: auto;
      padding: 10px;
      font-size: 16px;
      color: #fff;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.8);
      opacity: 0;
      transform: translate(-50%, 0px);
      transition: all 0.4s ease;
      pointer-events: none;
    }

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: -25px;
      width: 0;
      height: 0;
      border-style: solid;
      opacity: 0;
      border-width: 9px 9px 9px 0px;
      border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
      transform: translate(-90%, 0px) rotate(-45deg);
      transition: all 0.4s ease;
      pointer-events: none;
    }

    &:hover:after,
    &:hover:before {
      opacity: 1;
    }
  `;