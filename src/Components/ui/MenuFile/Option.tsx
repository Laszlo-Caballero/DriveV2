import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export default function Option({ icon, label, onClick }: Props) {
  return (
    <span
      className="flex cursor-pointer items-center gap-x-2 text-nowrap px-5 py-3 text-blue-zodiac-950 transition-all hover:bg-blue-zodiac-700 hover:text-white"
      onClick={() => onClick?.()}
    >
      {isValidElement(icon) &&
        cloneElement(icon as ReactElement<HTMLDivElement>, {
          className: "h-6 w-6",
        })}
      {label}
    </span>
  );
}
