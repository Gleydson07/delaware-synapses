import { signIn } from "@/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const handleLogin = async (code: string) => {
    const accessToken = await signIn(code);

    if (accessToken) {
      return router.push("/home");
    }
  };

  useEffect (() => {
    if (code) {
      handleLogin(code);
    }

    return router.push(`/login`);
  }, [code]);
}
