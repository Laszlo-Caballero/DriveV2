import { useEffect, useRef } from "react";

interface Props {
  closeFunction?: () => void;
}

export function useCloseDiv({ closeFunction }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeFunction?.();
        console.log("closeFunction");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeFunction]);

  return ref;
}
