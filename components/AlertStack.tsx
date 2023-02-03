import { useAlertStore } from "../stores/alertStore";

import { Alert } from "./Alert";

export function AlertStack() {
  const { content } = useAlertStore();

  return (
    <div className="sticky bottom-10 top-0 mt-auto self-start">
      {content?.map(({ key, value }) => (
        <Alert content={value} key={key} />
      ))}
    </div>
  );
}
