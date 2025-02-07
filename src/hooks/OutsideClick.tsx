import {
  Dispatch,
  FC,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
} from "react";

function useOutsideClick(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: RefObject<any>,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  onAction?: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
        onAction?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsOpen, onAction]);
}

interface Props {
  children: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onAction?: () => void;
  className?: string;
}

export const OutsideContainer: FC<Props> = ({
  children,
  setIsOpen,
  onAction,
  className,
}) => {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, setIsOpen, onAction);
  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};
