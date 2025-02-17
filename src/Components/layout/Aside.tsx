import Button from "../ui/Button/Button";

export default function Aside() {
  return (
    <div className="flex h-full w-[408px] justify-center bg-blue-ribbon-300 py-[56px]">
      <Button className="flex h-[66px] items-center gap-x-[20px] rounded-xl bg-blue-ribbon-400 px-[20px] font-monserrat text-2xl text-white">
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
    </div>
  );
}
