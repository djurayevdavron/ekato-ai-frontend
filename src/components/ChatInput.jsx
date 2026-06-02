function ChatInput({
  message,
  setMessage,
  sendMessage,
  darkMode,
}) {
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

      <div className="flex gap-2 sm:gap-3">

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className={`
            flex-1
            rounded-2xl
            px-4
            py-3
            text-sm
            sm:text-base
            outline-none
            border
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
            px-5
            sm:px-6
            rounded-2xl
            text-sm
            sm:text-base
            font-semibold
            transition

            ${
              darkMode
                ? `
                  bg-cyan-500
                  hover:bg-cyan-400
                  text-black
                  cursor-pointer
                `
                : `
                  bg-cyan-600
                  hover:bg-cyan-500
                  text-white
                  cursor-pointer
                `
            }
          `}
        >
          Send
        </button>

      </div>

    </div>
  );
}
export default ChatInput;