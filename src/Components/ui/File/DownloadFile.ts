import { config } from "../../../config/config";

interface DownloadFileProps {
  file?: string;
  path: string;
}

export async function DonwloadFile({ file, path }: DownloadFileProps) {
  const url =
    path?.length > 0
      ? `${config.apiUrl}/files/download/${path}/${file}`
      : `${config.apiUrl}/files/download/${file}`;

  const res = await fetch(url);

  const blob = await res.blob();

  const urlBlob = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = urlBlob;
  a.download = file ?? "";
  a.click();
  a.remove();
}
