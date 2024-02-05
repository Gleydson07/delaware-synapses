import Image from "next/image";
import { ContainerLogin } from "./styles";
import logo from "@/assets/imgs/delaware.png";
import { useRouter } from "next/navigation";
import { loginRedirect } from "@/api/auth";
import { useTitleHeader } from "@/hooks/useHeader";
import { useEffect } from "react";

export default function Login() {
  const { clearProjectName } = useTitleHeader();
  const router = useRouter();

  const handleLogin = async () => {
    const redirectTo = await loginRedirect();
    router.push(redirectTo);
  }

  useEffect(() => {
    clearProjectName();
  }, []);

  return (
    <ContainerLogin>
      <figure className="logo">
        <Image src={logo} alt="logo marca" />
      </figure>
      <div className="login">
        <h1 className="login-title">Welcome to delaware Synapses</h1>
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>
    </ContainerLogin>
  );
}
