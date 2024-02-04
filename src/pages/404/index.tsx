import Wrapper from "@/components/Wrapper"
import { NotFoundContainer } from "./styles"

export default function NotFound() {
  return (
    <Wrapper>
      <NotFoundContainer>
        <p>404 - Not Found</p>
        <p>Sorry, the page you are looking for does not exist.</p>
      </NotFoundContainer>
    </Wrapper>
  )

}