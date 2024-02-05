import { copilotSendMenssage } from "@/api/copilot";
import { useEffect, useState } from "react";

export default function UseOpenCopilot() {
  const [userMessages, setUserMessages] = useState<{ user: any; ai: any[] }[]>(
    []
  );

  const [loading, setLoading] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);

  const sendMessageToCopilot = async (message: string) => {
    try {
      setLoading(true);
      setAiTyping(true);

      setUserMessages((prevMessages: any) => [
        ...prevMessages,
        { user: message, ai: [] },
      ]);

      const response = await copilotSendMenssage({ request: message })
      const responseList = response.responseList;

      setUserMessages((prevMessages: any) => [
        ...prevMessages.slice(0, -1),
        { user: message, ai: responseList },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setAiTyping(false);
    }
  };

  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [userMessages]);

  return {
    userMessages,
    loading,
    sendMessageToCopilot,
    aiTyping
  }
}