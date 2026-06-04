import Message from "./Message";
import { useTranslation } from "react-i18next";

function ChatBox({
  messages,
  loading,
  bottomRef,
  darkMode,
}) {
  const { t } = useTranslation();
  return (
    <div
      className={`
        flex-1
        overflow-y-auto
        p-3
        sm:p-5
        space-y-4
        transition-all
        duration-300

        ${
          darkMode
            ? "bg-[#0b1120]"
            : "bg-[#f8fafc]"
        }
      `}
    >

      {messages.map((msg, index) => (
        <Message
          key={index}
          msg={msg}
          darkMode={darkMode}
        />
      ))}
      {/* LOADING */}
      {loading && (
        <div className="flex justify-start">
          <div
            className={`
              px-4
              py-3
              rounded-2xl
              text-sm
              animate-pulse

              ${
                darkMode
                  ? `
                    bg-[#1e293b]
                    text-cyan-300
                    border border-cyan-900
                  `
                  : `
                    bg-gray-200
                    text-black
                    border border-gray-300
                  `
              }
            `}
          >
            {t("typing")}
          </div>

        </div>
      )}
      <div ref={bottomRef}></div>

    </div>
  );
}
export default ChatBox;