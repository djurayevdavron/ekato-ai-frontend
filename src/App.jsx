import { useEffect, useRef, useState } from "react";
import API from "./services/api";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  // THEME STATE
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme =
      localStorage.getItem("theme");
    return savedTheme === "light"
      ? false
      : true;
  });

  const bottomRef = useRef(null);
  // AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // SAVE THEME
  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // LOAD CHAT HISTORY
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await API.get("/chat/history");
        const formatted = [];
        res.data.messages.forEach((msg) => {
          formatted.push({
            role: "user",
            text: msg.userMessage,
            time: msg.createdAt,
          });
          formatted.push({
            role: "ai",
            text: msg.aiMessage,
            time: msg.createdAt,
          });
        });

        setMessages(formatted);

      } catch (error) {
        console.log(error);

        toast.error(
          t("failedToLoadMessages")
        );
      }
    };

    loadMessages();
  }, [t]);

  // CLEAR CHAT
  const clearChat = async () => {
    try {
      await API.delete("/chat/history");

      setMessages([]);

      toast.success(
  t("chatCleared")
);

    } catch (error) {
      console.log(error);

      toast.error(
  t("serverError")
);
    }
  };
  // SEND MESSAGE
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message,
    };
    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);
    try {
      const res = await API.post("/chat", {
        message,
      });
      const aiMessage = {
        role: "ai",
        text: res.data.ai,
      };
      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (error) {
      console.log(error);
      toast.error(
  t("serverError")
);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: t("serverError"),
        },
      ]);
    }
    setLoading(false);
    setMessage("");
  };
  return (
    <div
      className={`min-h-screen p-2 sm:p-4 transition-all duration-300 ${
        darkMode
          ? "bg-[#020617] text-white"
          : "bg-[#e2e8f0] text-black"
      }`}
    >
      {/* MAIN CONTAINER */}
      <div
        className={`
          w-full
          max-w-5xl
          h-[100dvh]
          sm:h-[95vh]
          mx-auto
          rounded-none
          sm:rounded-3xl
          border
          flex
          flex-col
          overflow-hidden
          shadow-2xl
          transition-all
          duration-300

          ${
            darkMode
              ? `
                bg-[#0f172a]
                border-cyan-950
                shadow-cyan-500/10
              `
              : `
                bg-white
                border-gray-300
                shadow-black/10
              `
          }
        `}
      >
        {/* HEADER */}
        <div
  className={`
    p-4
    sm:p-5

    border-b

    flex
    flex-col
    sm:flex-row

    gap-3
    sm:gap-0

    items-center
    sm:items-center

    justify-between

    transition-all
    duration-300

    ${
      darkMode
        ? `
          bg-[#020617]
          border-cyan-950
        `
        : `
          bg-gray-100
          border-gray-300
        `
    }
  `}
>

          {/* LOGO */}
          <h1
            className={`
              text-2xl
              sm:text-3xl
              font-bold
              tracking-wide
              drop-shadow-lg

              ${
                darkMode
                  ? "text-cyan-400"
                  : "text-cyan-700"
              }
            `}
          >
            Εκατό
          </h1>
          {/* BUTTONS */}
          <div
  className="
    flex
    items-center
    justify-center
    sm:justify-end

    gap-2
    sm:gap-3

    flex-wrap

    w-full
    sm:w-auto
  "
>
            {/* THEME BUTTON */}
            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className={`
                px-3
                sm:px-4
                py-2
                rounded-xl
                text-xs
                sm:text-sm
                font-medium
                transition
                cursor-pointer
                ${
                  darkMode
                    ? `
                      bg-[#1e293b]
                      hover:bg-[#334155]
                      hover:text-yellow-400
                      text-white
                      border border-cyan-900
                    `
                    : `
                      bg-gray-200
                      hover:bg-gray-300
                      text-black
                      border border-gray-400
                    `
                }
              `}
            >
              {darkMode
                ? t("light")
                : t("dark")}
            </button>

            {/* CLEAR BUTTON */}
            <button
              onClick={clearChat}
              className={`
                px-3
                sm:px-4
                py-2
                rounded-xl
                text-xs
                sm:text-sm
                font-medium
                transition
                cursor-pointer
                ${
                  darkMode
                    ? `
                      bg-[#1e293b]
                      hover:bg-[#334155]
                      hover:text-white
                      text-cyan-300
                      border border-cyan-900
                    `
                    : `
                      bg-gray-200
                      hover:bg-gray-300
                      text-black
                      border border-gray-400
                    `
                }
              `}
            >
              {t("clear")}
            </button>
            <select
  defaultValue={
    localStorage.getItem("language") ||
    "en"
  }
  onChange={(e) => {
    i18n.changeLanguage(
      e.target.value
    );

    localStorage.setItem(
      "language",
      e.target.value
    );
  }}
  className={`
    px-2
    sm:px-3
    py-2

    rounded-xl
    text-xs
    sm:text-sm

    outline-none
    cursor-pointer

    ${
      darkMode
        ? `
          bg-[#1e293b]
          text-white
          border border-cyan-900
        `
        : `
          bg-gray-200
          text-black
          border border-gray-400
        `
    }
  `}
>
  <option value="uz">
    UZ
  </option>

  <option value="en">
    EN
  </option>

  <option value="ru">
    RU
  </option>
</select>

          </div>
        </div>
        {/* CHAT AREA */}
        <ChatBox
          messages={messages}
          loading={loading}
          bottomRef={bottomRef}
          darkMode={darkMode}
        />
        {/* INPUT */}
        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}
export default App;