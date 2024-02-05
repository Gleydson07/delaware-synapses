import Card from "@/components/Card";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";

import iconBackArrow from "@/assets/icons/back-arrow.svg";
import { cryptography } from "@/utils/cryptography";

export default function BtnBack({ token }: any) {
  const decript = cryptography.decrypt(token);

  const router = useRouter();
  return (
    <div className="header-wrapper">
      <Wrapper>
        <Card
          onClick={() => router.push(`/control-center/${decript.uuid}`)}
          title="Control Center"
          text="Back to Dashboard"
          icon={iconBackArrow}
        />
      </Wrapper>
    </div>
  )
}