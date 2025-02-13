import { AnyFileIcon } from "../../../assets/icons/AnyFileIcon";
import { ImageIcon } from "../../../assets/icons/ImageIcon";
import { PdfIcon } from "../../../assets/icons/PdfIcon";
import { PttIcon } from "../../../assets/icons/PttIcon";
import { RarIcon } from "../../../assets/icons/RarIcon";
import { WordIcon } from "../../../assets/icons/WordIcon";

export function FolderIcon(title: string) {
  const ext = title.split(".").pop();
  if (ext === "png" || ext === "jpg" || ext === "jpeg") {
    return <ImageIcon className="w-8 h-8 flex-shrink-0" />;
  }

  if (ext === "docx" || ext === "doc") {
    return <WordIcon className="w-8 h-8 flex-shrink-0" />;
  }
  if (ext === "rar" || ext === "zip") {
    return <RarIcon className="w-8 h-8 flex-shrink-0" />;
  }

  if (ext === "pdf") {
    return <PdfIcon className="w-8 h-8 flex-shrink-0" />;
  }

  if (ext === "pptx" || ext === "ppt") {
    return <PttIcon className="w-8 h-8 flex-shrink-0" />;
  }

  return <AnyFileIcon className="w-8 h-8 flex-shrink-0" />;
}
