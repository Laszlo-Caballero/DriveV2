import { MoreIcon } from "../../../assets/icons/MoreIcon";
import { FolderIcon } from "./FolderParser";

interface Props {
  title: string;
}

export default function File({ title }: Props) {
  return (
    <div className="py-3 px-5 flex items-center justify-between bg-blue-ribbon-300 rounded-2xl">
      <span className="flex items-center gap-x-2">
        {FolderIcon(title)}
        <p className="text-xl font-monserrat truncate max-w-[200px]">{title}</p>
      </span>

      <MoreIcon className="w-4 h-6 flex-shrink-0 cursor-pointer" />
    </div>
  );
}
