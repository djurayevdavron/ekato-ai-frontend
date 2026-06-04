import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";


function CodePreview({
  html,
  css,
  javascript,
  darkMode,
}) {
  const { t } = useTranslation();

  const [showPreview, setShowPreview] =
    useState(false);

  const [fullscreen, setFullscreen] =
    useState(false);

  const fullscreenRef = useRef(null);

  useEffect(() => {
    if (fullscreen) {
      setTimeout(() => {
        fullscreenRef.current?.focus();
      }, 100);
    }
  }, [fullscreen]);

  const srcDoc = `
<!DOCTYPE html>
<html>
<head>
<style>
body {
  margin: 0;
  padding: 16px;
  font-family: sans-serif;
}

${css || ""}
</style>
</head>

<body>

${html || ""}

<script>
window.addEventListener(
  "DOMContentLoaded",
  () => {
    try {
      ${javascript || ""}
    } catch (err) {
      console.error(err);
    }
  }
);
</script>

</body>
</html>
`;

  return (
    <>
      <div className="mt-3">
        <button
          onClick={() =>
            setShowPreview(
              !showPreview
            )
          }
          className={`
            px-4
            sm:px-5

            py-2.5

            rounded-xl

            text-sm
            font-semibold

            cursor-pointer

            shadow-lg

            transition-all
            duration-300

            hover:-translate-y-0.5
            hover:shadow-xl

            active:scale-95

            ${
              darkMode
                ? `
                  bg-cyan-400
                  hover:bg-cyan-300

                  text-black

                  shadow-cyan-500/20
                `
                : `
                  bg-cyan-500
                  hover:bg-cyan-600

                  text-white

                  shadow-cyan-500/20
                `
            }
          `}
        >
          {showPreview
            ? t("hide")
            : t("preview")}
        </button>

        {showPreview && (
          <div
            className={`
              mt-3

              overflow-hidden

              rounded-2xl
              border

              ${
                darkMode
                  ? `
                    border-cyan-500/10
                    bg-[#0f172a]
                  `
                  : `
                    border-slate-200
                    bg-white
                  `
              }
            `}
          >
            <div
              className={`
                flex
                items-center
                justify-between

                px-4
                py-3

                border-b

                ${
                  darkMode
                    ? `
                      bg-[#111827]
                      border-cyan-500/10
                    `
                    : `
                      bg-slate-50
                      border-slate-200
                    `
                }
              `}
            >
              <span
                className={`
                  text-sm
                  font-medium
                  tracking-wide

                  ${
                    darkMode
                      ? "text-slate-300"
                      : "text-slate-600"
                  }
                `}
              >
                {t("livePreview")}
              </span>

              <button
                onClick={() =>
                  setFullscreen(true)
                }
                className={`
                  px-3
                  py-1.5

                  rounded-lg

                  text-xs
                  font-medium
                  cursor-pointer

                  transition-all

                  ${
                    darkMode
                      ? `
                        bg-cyan-400
                        hover:bg-cyan-300

                        text-black
                      `
                      : `
                        bg-cyan-500
                        hover:bg-cyan-600

                        text-white
                      `
                  }
                `}
              >
                {t("fullscreen")}
              </button>
            </div>

            <iframe
              title="preview"
              srcDoc={srcDoc}
              sandbox="allow-scripts allow-modals"
              className="
                w-full
                h-[300px]
                sm:h-[400px]
                lg:h-[500px]
                bg-white
              "
            />
          </div>
        )}
      </div>

   {fullscreen &&
  createPortal(
    <div
      className="
        fixed
        inset-0
        z-[99999]

        flex
        flex-col

        bg-white
      "
    >
      <div
        className="
          flex
          items-center
          justify-between

          px-4
          py-3

          bg-[#111827]
        "
      >
        <span className="text-white">
          {t("livePreview")}
        </span>

        <button
          onClick={() =>
            setFullscreen(false)
          }
          className="
            px-4
            py-2
            rounded-lg

            bg-cyan-600
            hover:bg-cyan-500

            text-white
            cursor-pointer
          "
        >
          {t("close")}
        </button>
      </div>

      <iframe
  ref={fullscreenRef}
  title="fullscreen-preview"
  srcDoc={srcDoc}
  sandbox="allow-scripts allow-modals"
  tabIndex="0"
  onLoad={() => {
    fullscreenRef.current?.focus();
  }}
  className="
    flex-1
    w-full
    border-0
    bg-white
  "
/>
    </div>,
    document.body
  )}
    </>
  );
}
export default CodePreview;

