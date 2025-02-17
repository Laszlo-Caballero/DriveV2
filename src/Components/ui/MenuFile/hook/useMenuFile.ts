import { useParams } from "react-router";
import { config } from "../../../../config/config";
import { useCloseDiv } from "@/hooks/useCloseDiv";

interface Props {
  closeFunction?: () => void;
  title: string;
}

export function useMenuFile({ title, closeFunction }: Props) {
  const ref = useCloseDiv({
    closeFunction,
  });

  const params: Readonly<
    Partial<{
      "*": string;
    }>
  > = useParams();
  const handleDownload = async () => {
    const a = document.createElement("a");
    const link =
      `${config.apiUrl}/files/download/` + params["*"] != ""
        ? `${params["*"]}/${title}`
        : title;

    a.href = link;
    a.download = title;
    a.click();
    a.remove();
  };

  return { ref, handleDownload };
}
