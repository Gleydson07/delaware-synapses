import { keyframes, styled } from "styled-components";

interface CardProgressContainerProps {
  $percentComplete: number;
  $color: string;
  $bgColor: string;
  $isFeature: boolean;
}

const fillAnimation = (percentComplete: number) => keyframes`
    0% {
      width: 0%;
    }
    100% {
      width: calc(${percentComplete === 0
    ? percentComplete
    : percentComplete < 3
      ? 3
      : percentComplete
  }% - 4px)
    }
`;

export const CardProgressContainer = styled.div<CardProgressContainerProps>`
  display: flex;
  flex-direction: column;
  flex: 1;

  .card-progress-title {
    font-weight: 700;
    font-size: 22px;
    padding-left: 0.5rem;
    margin-bottom: 5px;
    text-transform: uppercase;
    color: ${(props) => props.$color};
  }

  .card-progress {
    flex: 1;
    display: flex;
    gap: 0.75rem;
    background-color: ${(props) => props.$bgColor};
    border-radius: 0.75rem;
    padding: 1rem;
    cursor: pointer;

    .card-progress-icon {
      width: 68px;
      height: 68px;
    }

    .card-progress-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .card-progress-percent-complete {
        font-size: 1.125rem;
        color: ${(props) => (!props.$isFeature ? "white" : props.$color)};
      }

      .card-progress-content {
        display: flex;
        flex-direction: column;
        width: 100%;

        .card-progress-work {
          display: flex;
          justify-content: space-between;
          gap: 20px;

          & > span {
            margin-bottom: 10px;
            font-size: 0.875rem;
            color: ${(props) => (!props.$isFeature ? "white" : props.$color)};
            width: 100%;

            &:nth-child(1) {
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            &:nth-child(2) {
              width: auto;
              white-space: nowrap;
            }
          }
        }

        .card-progress-bar {
          display: inline-block;
          position: relative;
          border-radius: 0.375rem;
          height: 1rem;
          width: 100%;
          background: white;

          &::after {
            position: absolute;
            top: 2px;
            left: 2px;
            content: "";
            width: 100%;
            height: calc(100% - 4px);
            background: ${(props) => props.$color};
            border-radius: 0.375rem;
            animation: ${(props) => fillAnimation(props.$percentComplete)} 0.8s
              ease both;
          }
        }
      }
    }
  }
`;
