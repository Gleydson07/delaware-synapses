import { styled } from "styled-components";

export const MenuDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 25px;
  }

  .header-wrapper {
    height: 250px;


    @media (max-width: 1260px) {
      height: auto;
    }

    @media (max-width: 768px) {
      flex: 1;
    }

    &.main {
      flex: 1;

      @media (max-width: 768px) {
        order: 2;
        width: 100%;
      }
    }

    .phases-container {
      display: flex;
      gap: 30px;
      height: 100%;

      @media (max-width: 1260px) {
        display: flex;
        flex-direction: column;

        height: auto;
      }

      .phases-container-item {
        position: relative;
        width: 100%;
      }
    }
  }
`;

export const FeatureContainer = styled.div`
  display: flex;
  gap: 20px;

  .card-details {
    gap: 20px;
    width: 100%;
    padding: 1rem;
    background: white;
    border-radius: 0.5rem;
  }
`;
