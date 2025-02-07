import {
  createContext,
  FC,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ErrorCircleIcon } from "../../../assets/icons/ErrorCircleIcon";
import { CheckCircleIcon } from "../../../assets/icons/CheckCircleIcon";

type ToasterContextType = {
  toasts: Array<ReactNode>;
  success: (message: string) => void;
  error: (message: string) => void;
  customItem: (item: ReactNode) => void;
};

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const ToasterProvider: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  const [toasts, setToast] = useState<Array<ReactNode>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasts.length > 0) {
        setToast((prev) => {
          const newToast = [...prev];
          newToast.shift();
          return newToast;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [toasts.length]);

  const success = useCallback((message: string) => {
    setToast((prev) => [
      ...prev,
      <span className="flex items-center gap-x-2">
        <CheckCircleIcon className="w-4 h-4 text-green-500" />
        {message}
      </span>,
    ]);
  }, []);

  const error = useCallback((message: string) => {
    setToast((prev) => [
      ...prev,
      <span className="flex items-center gap-x-2">
        <ErrorCircleIcon className="w-4 h-4 text-red-500" />
        {message}
      </span>,
    ]);
  }, []);

  const customItem = useCallback((item: ReactNode) => {
    setToast((prev) => [...prev, item]);
  }, []);

  return (
    <ToasterContext.Provider value={{ toasts, success, error, customItem }}>
      {children}
    </ToasterContext.Provider>
  );
};
export const Toast = () => {
  const context = useContext(ToasterContext);
  if (context === undefined) {
    throw new Error("Toast must be used within a ToasterProvider");
  }
  return context;
};
