import styled from "styled-components";

export const DetailsLegendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;

  .details-legend-list{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;

    & > li{
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;


      & > figure{
        width: 25px;
        height: 25px;

        & > img{
          width: 100%;
          height: auto;
        }
      }

      &:last-child{
        margin-bottom: 0px;
      }
    }
  }
`;