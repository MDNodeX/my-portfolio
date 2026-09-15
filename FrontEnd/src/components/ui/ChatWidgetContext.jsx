import React, { createContext, useContext, useState } from "react";

const ChatWidgetContext = createContext(null);

export function ChatWidgetProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <ChatWidgetContext.Provider
      value={{ isOpen, openChat, closeChat, toggleChat }}
    >
      {children}
    </ChatWidgetContext.Provider>
  );
}

export function useChatWidget() {
  const ctx = useContext(ChatWidgetContext);
  if (!ctx) {
    throw new Error("useChatWidget must be used inside <ChatWidgetProvider>");
  }
  return ctx;
}
