import { useAlertStore } from "../stores/alertStore";

import { Alert } from "./Alert";

export function AlertStack() {
  const { content } = useAlertStore();

  return (
    <div className="sticky bottom-0 top-0 mt-auto self-start">
      {content?.map((content) => (
        <Alert content={content} key={content} />
      ))}
    </div>
  );
}
