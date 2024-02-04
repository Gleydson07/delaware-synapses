import type { AppProps } from "next/app";
import GlobalStyle from "@/styles/globalStyle";
import { TextHeaderProvider } from "@/hooks/useContextHeader";
import { Container } from "@/styles/container";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TextHeaderProvider>
      <Container $isBackgroundImg>
        <GlobalStyle />
        <Component {...pageProps} />
      </Container>
    </TextHeaderProvider>
  );
}
