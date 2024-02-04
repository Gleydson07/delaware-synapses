import {styled} from "styled-components";

export const ContainerLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 40px);

  .logo{
    position: absolute;
    top: 20px;
    left: 20px;

    img{
      width: 250px;
      height: auto;
    }
  }

  .login{
    border: 2px solid #7f7f7f;
    background-color: #f2f2f2;
    border-radius: 0.75rem;
    padding: 1.25rem;
    text-align: center;

    .login-title{
      font-size: 24px;
      margin-top: 1.25rem;
      margin-bottom: 35px;
      font-weight: 100;
    }

    .login-btn{
      border: 2px solid #7f7f7f;
      padding: 5px 10px;
      border-radius: 5px;
      background: #D7D7D7;
      font-size: 16px;
    }

  }
`;
