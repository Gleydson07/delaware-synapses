import RingLoader from "react-spinners/RingLoader";
import { LoadingContainer } from "./styles";

export default function Loading() {
  return (
    <LoadingContainer>
      <RingLoader
        color="#ffffff"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </LoadingContainer>
  )
}