import { ReactNode } from "react"
import { WrapperContainer } from "./stylers"

interface WrapperProps {
  children: ReactNode
  title?: string,
}

export default function Wrapper({ children, title }: WrapperProps) {
  return (
    <WrapperContainer>
      {title && <h2 className="wrapper-title">{title}</h2>}
      {children}
    </WrapperContainer>
  )
}
