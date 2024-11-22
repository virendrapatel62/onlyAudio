import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Terminal } from "lucide-react";

export default function ErrorAlert(props: {
  title?: string | null;
  message?: string | null;
}) {
  if (!props.title && !props.message) {
    return;
  }

  return (
    <Alert variant={"destructive"} className="mt-4 bg-orange-300 ">
      <Terminal className="h-4 w-4" />
      <AlertTitle>{props.title || "Error!"}</AlertTitle>
      <AlertDescription>{props.message}</AlertDescription>
    </Alert>
  );
}
