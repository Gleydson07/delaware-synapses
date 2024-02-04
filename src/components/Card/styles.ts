import styled from "styled-components";

export const CardContainer = styled.div`
display: inline-flex;
flex-direction: column;
justify-content: space-between;
 width: 210px;
 height: 190px;
 padding: 1.25rem;
 border-radius: 0.375rem;
 border: 2px solid #bfbfbf;
 cursor: pointer;

 .card-content{

  .card-title{
    color: #727272;
    font-weight: 600;
    font-size: 20px;
  }

  .card-text{
    margin-top: 5px;
    color: #b1aeae;
    font-size: 14px;
  }
 }
`;