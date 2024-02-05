import { styled } from "styled-components";

interface HeaderAvatarProps {
  $isVisible: boolean
}

export const HeaderContainer = styled.header`
display: flex;
justify-content: space-between;

@media(max-width: 768px){
  flex-wrap: wrap;

  .header-logo{
    order: 0;
  }
  .header-content{
    order: 2;
    width: 100%;
    margin-top: 20px;
  }
}

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

  @media(max-width: 650px){
    order: 1;
}

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
    z-index: 1;

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