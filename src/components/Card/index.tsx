import Image from "next/image"
import Link from "next/link"

import IconProject from "@/assets/icons/project.svg"
import { CardContainer } from "./styles"
import { AnchorHTMLAttributes } from "react"
import { useTextHeader } from "@/hooks/useContextHeader"

interface CardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string,
  text?: string,
  link: string
  icon?: string
  headerTitle?: string,
}

export default function Card({ title, link, text, icon, headerTitle }: CardProps) {
  const { setTextHeader, textHeader } = useTextHeader();

  return (
    <Link href={link} onClick={() => setTextHeader(headerTitle ? headerTitle : textHeader)}>
      <CardContainer>
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          {text && <p className="card-text">{text}</p>}
        </div>

        <figure>
          <Image src={icon ? icon : IconProject} alt="icone de projetos" />
        </figure>
      </CardContainer>
    </Link>
  )
}