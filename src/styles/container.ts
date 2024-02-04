import imagebg from "@/assets/imgs/delaware-bg.png";
import styled from "styled-components";

interface ContainerProps {
  $isBackgroundImg?: boolean
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 20px;

  ${props =>
    props.$isBackgroundImg &&
    `
      background-image: url(${imagebg.src});
      background-size: cover;
    `}
`