import { css, keyframes, styled } from "styled-components";

interface CardProgressContainerProps {
  $percentComplete: number;
  $color: string;
  $bgColor: string;
  $tooltip: string;
}

const fillAnimation = (percentComplete: number) => keyframes`
    0% {
      width: 0%;
    }
    100% {
      width: calc(${percentComplete}% - 20px)
    }
`;

export const ProgressBarContainer = styled.div<CardProgressContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .progress-bar-title {
    font-weight: 700;
    font-size: 22px;
    padding-left: 0.5rem;
    text-transform: uppercase;
    color: ${(props) => props.$color};
  }

  .progress-bar-wrapper {
    width: 100%;
    display: flex;
    align-items: baseline;

    .progress-bar-step {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 55px;
      border: 2px solid white;
      border-radius: 50%;
      background: ${(props) => props.$color};
      z-index: 2;

      & > span {
        font-size: 1.25rem;
        color: white;
      }
    }

    .progress-bar-content {
      display: flex;
      flex-direction: column;
      flex: 1;

      .progress-bar {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% + 25px);
        height: 35px;
        margin-left: -25px;
        padding: 0 10px 0 30px;
        border-radius: 0.5rem;
        background: #a6a6a6;

        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 20px;
          height: 100%;
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          background: ${(props) => props.$bgColor};
          animation: ${(props) => fillAnimation(props.$percentComplete)} 0.8s
            ease both;
        }

        .progress-bar-name {
          position: relative;
          display: flex;
          align-items: center;
          gap: 5px;
          z-index: 10;

          & > span {
            font-size: 16px;
            color: white;
          }

          ${props => IsTooltip(props.$tooltip)}
        }

        time {
          position: relative;
          font-size: 16px;
          color: white;
          z-index: 10;
        }
      }

      .progress-bar-work {
        display: flex;
        justify-content: flex-end;
        gap: 40px;
        margin-top: 5px;
        margin-right: 10px;
        color: ${(props) => props.$color};

        & > span {
          font-size: 16px;
        }
      }
    }
  }
`;

const IsTooltip = (props: string) =>
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
