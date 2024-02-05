//_Copilot/OpenedCopilot/OpenedCopilot.jsx
import Image from "next/image";
import { Formik, Field, Form } from "formik";

import iconMind from "@/assets/icons/mind.svg"
import iconArrowDown from "@/assets/icons/arrow-down.svg"
import iconUser from "@/assets/icons/icon-user.svg"
import iconSendMensage from "@/assets/icons/send-message.svg"
import iconRegenerateAnswer from "@/assets/icons/regenerate-answer.svg"
import { CopilotChat, CopilotContainer, CopilotFoter, CopilotHeader } from "./styles";
import UseOpenCopilot from "./useOpenCopilot";

interface OpenCopilotProps {
  closeCopilot: () => void;
}

export default function OpenedCopilot({ closeCopilot }: OpenCopilotProps) {

  const { loading, sendMessageToCopilot, userMessages, aiTyping } = UseOpenCopilot()


  return (
    <CopilotContainer>
      <CopilotHeader onClick={closeCopilot} >
        <div className="copilot-header-img">
          <Image
            src={iconMind}
            width={40}
            height={40}
            alt="Copilot"
          />
          <p>Mind</p>
        </div>

        <Image
          src={iconArrowDown}
          width={25}
          height={25}
          alt="Copilot"
        />
      </CopilotHeader>

      <CopilotChat
        id="chat-container">
        <div className="mensage-mind">
          <Image
            src={iconMind}
            width={20}
            height={17}
            alt="Synapses logo"
          />
          <div>Hi. How can I help you today?</div>
        </div>

        {userMessages.map((messageSet, index) => (
          <>
            <div className="mensage-user" key={index}>
              <p>{messageSet.user}</p>
              <Image
                src={iconUser}
                width={17}
                height={17}
                alt="User tag"
              />
            </div>

            {Array.isArray(messageSet.ai) && messageSet.ai.length > 0 && (
              <div className="mensage-mind">
                <Image
                  src={iconMind}
                  width={20}
                  height={17}
                  alt="Synapses logo"
                />
                <div>
                  {messageSet.ai.map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                  ))}
                </div>
              </div>
            )}
            {loading && index === userMessages.length - 1 && aiTyping && (
              <div className="mensage-mind">
                <Image
                  src={iconMind}
                  width={20}
                  height={17}
                  alt="Synapses logo"
                />
                <div>Mind is typing...</div>
              </div>
            )}
          </>
        ))}
      </CopilotChat>

      <CopilotFoter>
        <Image
          src={iconRegenerateAnswer}
          width={140}
          height={29}
          alt="Regenerate answer"
        />
        <Formik
          initialValues={{ message: "" }}
          onSubmit={(values: any, { resetForm }: any) => {
            sendMessageToCopilot(values.message);
            resetForm();
          }}
        >
          <Form
            spellCheck="false"
            autoComplete="false"
          >
            <Field
              id="message"
              name="message"
              placeholder="Send a message."
              autoComplete="off"
            />
            <button className="absolute right-4 top-2 " type="submit">
              <Image
                className=""
                src={iconSendMensage}
                width={16}
                height={16}
                alt="Send message"
              />
            </button>
          </Form>
        </Formik>
      </CopilotFoter>
    </CopilotContainer>
  );
}
