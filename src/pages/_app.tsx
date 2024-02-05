import type { AppProps } from "next/app";
import GlobalStyle from "@/styles/globalStyle";
import { Container } from "@/styles/container";
import Header from "@/components/Header";
import { TitleHeaderProvider } from "@/hooks/useHeader";
import Copilot from "@/components/Copilot";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isLoginPage = router.pathname === "/login";

  return (
    <TitleHeaderProvider>
      <Container $isBackgroundImg>
        <Header />
        <GlobalStyle />
        <Component {...pageProps} />
        {isLoginPage ? null : <Copilot />}
      </Container>
    </TitleHeaderProvider>
  );
}
