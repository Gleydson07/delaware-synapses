import styled from "styled-components";

interface HeaderAvatarProps {
  $isVisible: boolean
}

export const HeaderContainer = styled.header`
display: flex;
justify-content: space-between;

  .header-logo{
    img{
      width: 250px;
      height: auto;
    }
  }

  .header-content{
    text-align: center;

    & > h2{
      font-size: 26px;
      font-weight: 100;
      color: white;
    }

    & > p{
      margin-top: 10px;
      font-size: 1.125rem;
      font-weight: 100;
      color: white;
    }
  }
`;

export const HeaderAvatar = styled.div<HeaderAvatarProps>`
  position: relative;
  .header-btn{
    background: none;
    border: none;

    & > figure{
      width: 55px;
      height: auto;

      img{
        width: 100%;
        height: auto;
      }
    }
  }

  .header-popup{
    position: absolute;
    top: 100%;
    right: 0;
    display: ${props => props.$isVisible ? "block" : "none"};
    padding: 10px 1.5rem;
    box-shadow: 1px 2px 7px;
    background: white;
    border-radius: 0.50rem;

    & > button{
      display: flex;
      align-items: center;
      gap: 5px;
      background: none;
      border: none;
      font-size: 16px;

      img{
        width: 25px;
        height: auto;
      }
    }
  }
`;
