import { FC, SVGProps } from "react";
export const CrossIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19 19"
    fill="none"
    {...props}
  >
    <path
      d="M17 2L2 17M2.00003 2L17 17"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
