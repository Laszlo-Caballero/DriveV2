import { useState } from "react";
import Button from "../ui/Button/Button";
import MenuNew from "../ui/MenuNew/MenuNew";

export default function Aside() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-[200px] w-full items-center justify-center bg-blue-ribbon-300 lg:w-[408px] xl:h-full xl:items-start xl:py-[56px]">
      <div className="flex items-center gap-y-5 xl:flex-col">
        <Button
          className="flex h-[66px] items-center gap-x-[20px] rounded-xl bg-blue-ribbon-400 px-[20px] font-monserrat text-2xl text-white"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
          >
            <path
              d="M2 17H31.8507M16.9254 2V32"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Nuevo
        </Button>

        {isOpen && (
          <MenuNew
            className="bottom-0 right-0"
            closeFunction={() => {
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
