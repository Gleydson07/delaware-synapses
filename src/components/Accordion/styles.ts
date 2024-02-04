import { styled } from "styled-components";

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.19rem;
  width: 100%;

  .accordion-list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;

    li {
      position: relative;
      margin-bottom: 0.3rem;
      padding: 10px 0px;
      font-size: 14px;

      &:last-child {
        margin-bottom: 0rem;
      }

      &.isActive {
        .acordion-content {
          max-height: 1000px;
          transition: max-height 0.3s linear;
        }
      }

      .accordion-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding-bottom: 5px;
        border-bottom: 2px solid #393939;
        cursor: pointer;

        .accordion-header-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;

          & > h3 {
            font-size: 16px;
            color: #393939;
            font-weight: 700;
          }
        }

        .accordion-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;

          .btn-run {
            border: none;
            background: none;
            width: 45px;
            height: auto;
            line-height: 0;

            img {
              width: 100%;
              height: auto;
            }
          }
        }
      }

      .acordion-content {
        max-height: 0px;
        overflow: hidden;
        cursor: pointer;

        .accordion-items {
          list-style: none;
          padding: 0;
          margin: 0;

          & > li {
            border-bottom: 2px solid #f2f2f2;
            max-height: 45px;
            overflow: hidden;

            &.isActive {
              max-height: 1000px;
              transition: max-height 0.3s linear;
            }

            .accordion-item-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-left: 20px;
            }

            .accordion-item-doc {
              background: #f2f2f2;
              margin-top: 10px;
              padding-left: 20px;
              padding-top: 10px;
              padding-bottom: 10px;

              & > p {
                margin-bottom: 5px;
              }

              & > a {
                display: flex;
                align-items: center;
                gap: 5px;
                color: black;
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
`;
