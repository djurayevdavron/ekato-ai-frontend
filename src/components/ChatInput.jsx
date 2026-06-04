import { useTranslation } from "react-i18next";

function ChatInput({
  message,
  setMessage,
  sendMessage,
  darkMode,
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`
        p-3
        sm:p-5

        border-t

        transition-all
        duration-300

        ${
          darkMode
            ? `
              bg-[#020617]
              border-cyan-950
            `
            : `
              bg-white
              border-gray-300
            `
        }
      `}
    >
      <div
        className="
          flex
          flex-col
          sm:flex-row

          gap-2
          sm:gap-3
        "
      >
        <textarea
  placeholder={t("placeholder")}
  value={message}
  onChange={(e) =>
    setMessage(e.target.value)
  }
  onKeyDown={(e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  }}
  rows={1}
  className={`
    w-full
    sm:flex-1

    rounded-2xl

    px-4
    py-3

    text-sm
    sm:text-base

    outline-none
    border

    resize-none

    transition-all

    ${
      darkMode
        ? `
          bg-[#1e293b]
          border-cyan-900
          text-white

          placeholder:text-gray-400

          focus:border-cyan-400
        `
        : `
          bg-gray-100
          border-gray-300
          text-black

          placeholder:text-gray-500

          focus:border-cyan-600
        `
    }
  `}
/>

        <button
          onClick={sendMessage}
          className={`
            w-full
            sm:w-auto

            px-5
            sm:px-6

            py-3

            rounded-2xl

            text-sm
            sm:text-base

            font-semibold

            transition-all
            duration-300

            cursor-pointer

            ${
              darkMode
                ? `
                  bg-cyan-500
                  hover:bg-cyan-400

                  text-black
                `
                : `
                  bg-cyan-600
                  hover:bg-cyan-500

                  text-white
                `
            }
          `}
        >
          {t("send")}
        </button>
      </div>
    </div>
  );
}
export default ChatInput;