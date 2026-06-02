import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Message({ msg, darkMode }) {
  return (
    <div
      className={`flex ${
        msg.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
          px-4
          py-3
          rounded-2xl
          max-w-[85%]
          sm:max-w-[70%]
          break-words
          text-sm
          sm:text-base
          ${
            msg.role === "user"
              ? darkMode
                ? `
                  bg-cyan-500
                  text-black
                `
                : `
                  bg-cyan-600
                  text-white
                `
              : darkMode
              ? `
                bg-[#1e293b]
                text-cyan-100
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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
        >
          {msg.text}
        </ReactMarkdown>

        {/* TIMESTAMP */}
        <div
          className={`
            text-[11px]
            mt-2
            opacity-70
            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }
          `}
        >
          {msg.time
            ? new Date(
                msg.time
              ).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            : ""}
        </div>
      </div>
    </div>
  );
}
export default Message;