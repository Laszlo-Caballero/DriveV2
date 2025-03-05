import { HTMLAttributes, forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }: HTMLAttributes<HTMLButtonElement>, ref) => {
    return (
      <button
        className="p-2 bg-shadow-green-700 rounded-xl"
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
