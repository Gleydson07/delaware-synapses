import Image from "next/image"
import IconProject from "@/assets/icons/project.svg"
import { CardContainer } from "./styles"
import { AnchorHTMLAttributes } from "react"

interface CardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string,
  text?: string,
  link: string
  icon?: string
  headerTitle?: string,
  onClick?: () => void
}

export default function Card({ title, link, text, icon, onClick }: CardProps) {

  return (
    <div onClick={onClick}>
      <CardContainer>
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          {text && <p className="card-text">{text}</p>}
        </div>

        <figure>
          <Image src={icon ? icon : IconProject} alt="icone de projetos" />
        </figure>
      </CardContainer>
    </div>
  )
}