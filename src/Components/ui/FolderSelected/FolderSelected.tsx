import { FolderOutLineIcon } from "@/assets/icons/FolderOutLineIcon";
import { cx } from "class-variance-authority";
import { useState } from "react";

export default function FolderSelected({
  folder,
  onClick,
  selected,
}: {
  folder: string;
  onClick?: () => void;
  selected?: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <span
      className={cx(
        "flex w-[600px] cursor-pointer items-center gap-x-3 rounded-r-full px-1 py-2 font-monserrat text-lg hover:bg-blue-zodiac-600 hover:text-white",
        selected && "bg-blue-zodiac-600 text-white",
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick?.()}
    >
      <FolderOutLineIcon
        className={cx(
          "h-8 w-8",
          hover ? "text-white" : "text-blue-zodiac-950",
          selected && "text-white",
        )}
      />
      {folder}
    </span>
  );
}
