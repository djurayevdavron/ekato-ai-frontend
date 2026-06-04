import { useState } from "react";
import { useTranslation } from "react-i18next";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import {
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import CodePreview from "./CodePreview";


function Message({ msg, darkMode }) {
  const { t } = useTranslation();
  const [copied, setCopied] =
    useState(false);

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(
        code
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  const htmlMatch =
  msg.text?.match(
    /```(?:html|HTML|htm)\s*([\s\S]*?)```/
  );

const cssMatch =
  msg.text?.match(
    /```(?:css|CSS)\s*([\s\S]*?)```/
  );

const jsMatch =
  msg.text?.match(
    /```(?:js|javascript|JS|JavaScript)\s*([\s\S]*?)```/
  );

const html =
  htmlMatch?.[1]?.trim() || "";

const css =
  cssMatch?.[1]?.trim() || "";

const javascript =
  jsMatch?.[1]?.trim() || "";

const hasPreview =
  msg.role === "ai" &&
  html.length > 0;
  
  return (
    <div
      className={`flex w-full ${
        msg.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
          px-4
          py-3

          w-full
          sm:w-fit

          max-w-full
          sm:max-w-[85%]
          lg:max-w-[75%]

          break-words
          overflow-hidden

          text-sm
          sm:text-base

          transition-all
          duration-300

          ${
            msg.role === "user"
              ? darkMode
                ? `
                  bg-gradient-to-br
                  from-cyan-400
                  via-cyan-500
                  to-blue-600

                  text-white

                  shadow-lg
                  shadow-cyan-500/10

                  border
                  border-cyan-300/20

                  rounded-[28px]
                  rounded-br-md
                `
                : `
                  bg-gradient-to-br
                  from-cyan-500
                  via-sky-500
                  to-blue-600

                  text-white

                  shadow-md

                  rounded-[28px]
                  rounded-br-md
                `
              : darkMode
              ? `
                bg-[#0b1220]

                text-slate-100

                border
                border-cyan-500/10

                shadow-lg
                shadow-black/30

                rounded-[28px]
                rounded-bl-md
              `
              : `
                bg-white/90

                backdrop-blur-xl

                text-slate-800

                border
                border-slate-200

                shadow-lg
                shadow-slate-200/50

                rounded-[28px]
                rounded-bl-md
              `
          }
        `}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }) {
              const match =
                /language-(\w+)/.exec(
                  className || ""
                );

              const codeString =
                String(children).replace(
                  /\n$/,
                  ""
                );

              return !inline && match ? (
                <div
                  className="
                    relative
                    my-4

                    overflow-x-auto
                    max-w-full

                    rounded-2xl

                    border
                    border-cyan-500/10
                  "
                >
                  {/* TOPBAR */}
                  <div
                    className={`
                      flex
                      items-center
                      gap-3

                      px-4
                      py-3

                      border-b
                      border-cyan-500/10

                      ${
                        darkMode
                          ? "bg-[#0f172a]"
                          : "bg-slate-100"
                      }
                    `}
                  >
                    {/* LANGUAGE */}
                    <span
                      className={`
                        text-[10px]
                        sm:text-xs

                        uppercase
                        tracking-widest
                        font-medium

                        ${
                          darkMode
                            ? "text-cyan-300"
                            : "text-slate-500"
                        }
                      `}
                    >
                      {match[1]}
                    </span>

                    {/* COPY BUTTON */}
                    <button
                      onClick={() =>
                        copyCode(
                          codeString
                        )
                      }
                      className={`
                        ml-auto

                        text-[10px]
                        sm:text-xs

                        font-medium

                        px-3
                        py-1.5

                        rounded-xl
                        cursor-pointer

                        transition-all
                        duration-300

                        hover:scale-105

                        shadow-lg

                        ${
                          darkMode
                            ? `
                              bg-cyan-400/90
                              hover:bg-cyan-300
                              text-black
                              shadow-cyan-500/20
                              duration-300
                            `
                            : `
                              bg-slate-200
                              hover:bg-slate-300
                              text-slate-700
                              shadow-slate-300/30
                            `
                        }
                      `}
                    >
                      {copied
                        ? t("copied")
                        : t("copy")}
                    </button>
                  </div>

                  {/* CODE */}
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    wrapLongLines={true}
                    codeTagProps={{
                      style: {
                        whiteSpace:
                          "pre-wrap",
                        wordBreak:
                          "break-word",
                      },
                    }}
                    customStyle={{
                      margin: 0,
                      borderRadius:
                        "0 0 16px 16px",
                      padding: "16px",
                      overflowX: "auto",
                      fontSize: "13px",
                      maxWidth: "100%",
                      width: "100%",
                      background:
                        darkMode
                          ? "#1e293b"
                          : "#f8fafc",
                      color:
                        darkMode
                          ? "#e2e8f0"
                          : "#0f172a",
                    }}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className={`
                    px-1.5
                    py-0.5

                    rounded-md

                    break-words

                    ${
                      darkMode
                        ? `
                          bg-black/20
                          text-cyan-300
                        `
                        : `
                          bg-slate-200
                          text-slate-700
                        `
                    }
                  `}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {msg.text}
        </ReactMarkdown>
        {hasPreview && (
  <CodePreview
    html={html}
    css={css}
    javascript={javascript}
    darkMode={darkMode}
  />
)}

        {/* TIMESTAMP */}
        <div
          className={`
            text-[11px]
            mt-3

            font-medium
            tracking-wide

            ${
              darkMode
                ? "text-cyan-100/70"
                : "text-slate-500"
            }
          `}
        >
          {msg.time
            ? new Date(
                msg.time
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
export default Message;