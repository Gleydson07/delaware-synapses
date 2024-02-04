import type { AppProps } from "next/app";
import GlobalStyle from "@/styles/globalStyle";
import { Container } from "@/styles/container";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Container $isBackgroundImg>
        <Header />
        <GlobalStyle />
        <Component {...pageProps} />
      </Container>
    </>
  );
}
