import Button from "../ui/Button/Button";

export default function Aside() {
  return (
    <div className="w-[408px] h-full bg-blue-ribbon-300 flex  justify-center py-[56px]">
      <Button className="flex items-center bg-blue-ribbon-400 text-white px-[20px] gap-x-[20px] h-[66px] rounded-xl font-monserrat text-2xl">
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
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Nuevo
      </Button>
    </div>
  );
}
