import { FC, SVGProps } from "react";
export const DownloadIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 31 31"
    fill="none"
    {...props}
  >
    <path
      d="M15.4999 3.875V20.6667M15.4999 20.6667L20.6666 15.0156M15.4999 20.6667L10.3333 15.0156"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M19.375 27.125H11.625C7.97161 27.125 6.14492 27.125 5.00996 25.99C3.875 24.855 3.875 23.0283 3.875 19.375M27.125 19.375C27.125 23.0283 27.125 24.855 25.99 25.99C25.6028 26.3773 25.1351 26.6324 24.5417 26.8004"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
