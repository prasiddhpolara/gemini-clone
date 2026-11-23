import { createContext, useState, useEffect } from "react";
import runChat from "../Config/gemini";

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext();

// read saved chats from the browser (so chats stay after refresh)
const loadChats = () => {
  try {
    const saved = localStorage.getItem("gemini-chats");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // chats = [{ id, title, messages: [{ role, text }] }]
  const [chats, setChats] = useState(loadChats);
  const [activeChatId, setActiveChatId] = useState(null);

  // save chats whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("gemini-chats", JSON.stringify(chats));
    } catch (error) {
      console.log(error);
    }
  }, [chats]);

  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const messages = activeChat ? activeChat.messages : [];
  const showResult = activeChat !== undefined;

  // add one message to a chat
  const addMessage = (chatId, message) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  const onSent = async (prompt) => {
    const text = prompt.trim();
    if (!text || loading) return;

    const userMessage = { role: "user", text: text };
    let chatId = activeChatId;
    let history;

    if (activeChat === undefined) {
      // first message, so start a new chat
      chatId = Date.now();
      const title = text.length > 28 ? text.slice(0, 28) + "..." : text;
      const newChat = { id: chatId, title: title, messages: [userMessage] };
      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(chatId);
      history = [userMessage];
    } else {
      // send the old messages too, so Gemini remembers the conversation
      // (error messages are skipped)
      const oldMessages = activeChat.messages.filter((m) => !m.error);
      history = [...oldMessages, userMessage];
      addMessage(chatId, userMessage);
    }

    setInput("");
    setLoading(true);

    try {
      const reply = await runChat(history);
      addMessage(chatId, { role: "model", text: reply });
    } catch (error) {
      console.log(error);
      addMessage(chatId, {
        role: "model",
        text: "Sorry, something went wrong. Please check your API key and internet, then try again.",
        error: true,
      });
    }

    setLoading(false);
  };

  const newChat = () => {
    setActiveChatId(null);
    setInput("");
  };

  const openChat = (id) => {
    setActiveChatId(id);
  };

  const clearChats = () => {
    setChats([]);
    setActiveChatId(null);
  };

  const contextValue = {
    input,
    setInput,
    chats,
    activeChatId,
    messages,
    showResult,
    loading,
    onSent,
    newChat,
    openChat,
    clearChats,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
