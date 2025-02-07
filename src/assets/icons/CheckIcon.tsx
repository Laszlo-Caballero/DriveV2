import { FC, SVGProps } from "react";
export const CheckIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M4 12.6111L8.92308 17.5L20 6.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
