import styled from "styled-components";

export const PhaseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.5rem;
  width: 100%;
`;

export const EpicContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;

  @media (max-width: 1012px) {
    flex-direction: column;
  }

  .epic-column {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.5rem;
  }
`;
