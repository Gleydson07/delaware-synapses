import { useState } from "react";
import OpenedCopilot from "./OpenCopilot";
import ClosedCopilot from "./CloseCopilot";

export default function Copilot() {
  const [copilotOpen, setCopilotOpen] = useState(false);

  return (
    <>
      {copilotOpen ? (
        <OpenedCopilot
          closeCopilot={() => setCopilotOpen(false)}
        ></OpenedCopilot>
      ) : (
        <ClosedCopilot openCopilot={() => setCopilotOpen(true)}></ClosedCopilot>
      )}
    </>
  );
}