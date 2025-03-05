import { cva, VariantProps } from "class-variance-authority";
import { Toast } from "./ToasterProvider";
import { FC } from "react";
import { cn } from "../../../utils/cn";

const toasterClass = cva("absolute  z-[1000] flex flex-col gap-y-4", {
  variants: {
    size: {
      sm: "w-40",
      md: "w-60",
      lg: "w-80",
    },
    position: {
      "top-left": "top-4 left-4",
      "top-right": "top-4 right-4",
      "bottom-right": "bottom-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "mid-top": "top-2 left-1/2 -translate-x-1/2 ",
      "mid-bottom": "bottom-2 left-1/2 -translate-x-1/2 ",
    },
  },
  defaultVariants: {
    size: "md",
    position: "top-left",
  },
});

export const Toaster: FC<VariantProps<typeof toasterClass>> = ({
  size,
  position,
}) => {
  const { toasts } = Toast();

  return (
    <div className={cn(toasterClass({ size, position }))}>
      {toasts?.map((toast, index) => {
        return (
          <div key={index} className="bg-white p-2 rounded-md w-full shadow-md">
            {toast}
          </div>
        );
      })}
    </div>
  );
};
