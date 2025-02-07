import { AnyFileIcon } from "../../../assets/icons/AnyFileIcon";
import { FolderIcon } from "../../../assets/icons/FileIcon";
import { FileTextIcon } from "../../../assets/icons/FileTextIcon";
import { ImageIcon } from "../../../assets/icons/ImageIcon";
import { RarIcon } from "../../../assets/icons/RarIcon";

export const fileIcon = (title: string) => {
  if (title.includes(".")) {
    const ext = title.split(".").pop();

    if (ext === "jpg" || ext === "png" || ext === "jpeg") {
      return <ImageIcon className="w-8 h-8 text-white" />;
    }
    if (ext === "rar" || ext === "zip") {
      return <RarIcon className="w-8 h-8 text-white" />;
    }

    if (ext === "txt") {
      return <FileTextIcon className="w-8 h-8 text-white" />;
    }

    return <AnyFileIcon className="w-8 h-8 text-white" />;
  } else {
    return <FolderIcon className="w-8 h-8 text-white" />;
  }
};
