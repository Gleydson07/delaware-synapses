import { ReactNode } from "react"
import { TooltipContainer } from "./style"

interface TooltipProps {
  text: string
  children: ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  return (
    <TooltipContainer $text={text}>
      {children}
    </TooltipContainer>
  )
}