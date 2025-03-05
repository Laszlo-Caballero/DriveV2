import { cn } from "@/utils/cn";
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  errors?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errors, ...props }: InputProps, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          type="text"
          className={cn(
            "w-[500px] rounded-lg border border-black bg-transparent p-2 text-black placeholder:text-black",
            errors && "border-red-500 text-red-500 placeholder:text-red-500",
          )}
          {...props}
        />
        {errors && <p className="text-red-500">{errors}</p>}
      </div>
    );
  },
);

export default Input;
