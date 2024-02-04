import { useEffect, useState } from "react";
import { HeaderAvatar, HeaderContainer } from "./styles";
import Image from "next/image";

import logo from "@/assets/imgs/delaware.png";
import iconUser from "@/assets/icons/icon-user.svg";
import logout from "@/assets/icons/logout.svg";
import { useRouter } from "next/navigation";
import { signOut } from "@/api/auth";
import { useTitleHeader } from "@/hooks/useHeader";

export default function Header() {
  const router = useRouter();
  const { projectName } = useTitleHeader();

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
        <Image src={logo} alt="logo marca" width={250} />
      </figure>

      <div className="header-content">
        {projectName && <h2>Control Center</h2>}
        {projectName && <p>{projectName}</p>}
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
