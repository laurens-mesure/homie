import { useEffect, useState } from "react";
import clsx from "clsx";

import { useAlertStore } from "../stores/alertStore";

export function Alert({ content }: { content: string }) {
  const { setStore } = useAlertStore();
  const [show, setShow] = useState<boolean>(!!content);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (content) {
      timeout = setTimeout(() => {
        setShow(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [content, setStore]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!show) {
      timeout = setTimeout(() => {
        setStore((prev) => ({ content: prev.content?.filter(({ value }) => value !== content) }));
      }, 1500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [content, setStore, show]);

  return (
    <div
      className={clsx(
        "mt-5 whitespace-nowrap rounded-sm bg-white px-5 py-2 text-neutral-800 shadow-2xl transition-all duration-150",
        show ? "translate-x-0" : "translate-x-[-200vw]"
      )}
      key={content}
    >
      {content}
    </div>
  );
}
