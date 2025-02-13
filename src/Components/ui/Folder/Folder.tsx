import { Link } from "react-router";
import { FolderIcon } from "../../../assets/icons/FileIcon";
import { MoreIcon } from "../../../assets/icons/MoreIcon";

interface Props {
  title: string;
}

export default function Folder({ title }: Props) {
  return (
    <div
      className="py-3 px-5 flex items-center justify-between bg-blue-ribbon-300 rounded-2xl"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Link className="flex items-center gap-x-2" to={title}>
        <FolderIcon className="w-8 h-8 flex-shrink-0" />
        <p className="text-xl font-monserrat truncate max-w-[200px]">{title}</p>
      </Link>

      <MoreIcon className="w-4 h-6 flex-shrink-0 cursor-pointer" />
    </div>
  );
}
