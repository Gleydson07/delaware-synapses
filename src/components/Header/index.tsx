import { useState } from "react";
import { HeaderAvatar, HeaderContainer } from "./styles";
import Image from "next/image";

import logo from "@/assets/imgs/delaware.png";
import iconUser from "@/assets/icons/icon-user.svg";
import logout from "@/assets/icons/logout.svg";
import { useRouter } from "next/navigation";
import { useTextHeader } from "@/hooks/useContextHeader";
import { signOut } from "@/api/auth";

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter();
  const { textHeader } = useTextHeader();

  const [isLogoutVisible, SetIslogoutVisible] = useState(false);

  const handleIsActiveLogout = () => {
    SetIslogoutVisible(!isLogoutVisible);
  };

  const handleLogout = async () => {
    const redirectTo = await signOut();
    router.push(redirectTo);
  };

  return (
    <HeaderContainer>
      <figure className="header-logo">
        <Image src={logo} alt="logo marca" />
      </figure>

      <div className="header-content">
        {title && <h2>{title}</h2>}
        {textHeader && <p>{textHeader}</p>}
      </div>

      <HeaderAvatar $isVisible={isLogoutVisible}>
        <button onClick={handleIsActiveLogout} className="header-btn">
          <figure>
            <Image src={iconUser} alt="icone de usuario" />
          </figure>
        </button>

        <div className="header-popup">
          <button onClick={handleLogout}>
            <Image src={logout} alt="icone de logout" />
            Logout
          </button>
        </div>
      </HeaderAvatar>
    </HeaderContainer>
  );
}
