import { FormEvent, ReactNode, useEffect, useRef } from "react";

interface Props {
  closeFunction?: () => void;
  submitFunction?: () => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  title?: string;
  children?: ReactNode;
  Element?: "div" | "form";
}

export default function Modal({
  closeFunction,
  submitFunction,
  title,
  children,
  Element = "div",
  onSubmit,
}: Props) {
  const ref = useRef<HTMLDivElement | HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeFunction?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeFunction, ref]);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <Element
        className="flex flex-col gap-y-4 rounded-2xl bg-blue-zodiac-50 p-8 font-monserrat"
        ref={ref as React.RefObject<HTMLDivElement & HTMLFormElement>}
        onSubmit={(e) => {
          if (Element === "form") {
            onSubmit?.(e as FormEvent<HTMLFormElement>);
          }
        }}
      >
        <p className="text-4xl">{title}</p>
        {children}
        <div className="flex w-full items-center justify-end">
          <button
            className="px-4 py-2 text-lg text-blue-zodiac-700"
            onClick={closeFunction}
          >
            Cancelar
          </button>
          <button
            className="rounded-full bg-blue-zodiac-700 px-4 py-2 text-lg text-white"
            onClick={submitFunction}
          >
            Aceptar
          </button>
        </div>
      </Element>
    </div>
  );
}
