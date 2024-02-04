import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  body{
    background: white;
    -webkit-font-smooth: antialiased;
  }

  body, input, text-area, button{
    font-family: "Montserrat";
  }

  button{
    cursor: pointer;
  }

  a{
    text-decoration: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;


