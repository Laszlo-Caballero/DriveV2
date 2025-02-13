import { FolderIcon } from "../../../assets/icons/FileIcon";

interface DropFileProps {
  folder: string;
}

export default function DropFile({ folder }: DropFileProps) {
  return (
    <div className="absolute top-0 right-0 z-10 p-4 w-full h-full">
      <div className=" w-full h-full bg-blue-zodiac-300 bg-opacity-50 flex items-end justify-center py-[28px] ">
        <div className="flex flex-col items-center justify-center gap-y-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="117"
            height="89"
            viewBox="0 0 117 89"
            fill="none"
          >
            <path
              d="M62.6562 88.2188V63.2812H79.2812L58.5 38.3438L37.7187 63.2812H54.3437V88.2188H33.5625V88.0109C32.8642 88.0525 32.1992 88.2188 31.4844 88.2188C23.2171 88.2188 15.2884 84.9346 9.44253 79.0887C3.59667 73.2429 0.3125 65.3142 0.3125 57.0469C0.3125 41.0536 12.4072 28.0196 27.9266 26.2324C29.2873 19.1194 33.0841 12.7028 38.6639 8.08625C44.2438 3.46973 51.258 0.941889 58.5 0.9375C65.743 0.941554 72.7583 3.4691 78.3396 8.0855C83.9208 12.7019 87.7193 19.1187 89.0817 26.2324C104.601 28.0196 116.679 41.0536 116.679 57.0469C116.679 65.3142 113.395 73.2429 107.549 79.0887C101.703 84.9346 93.7746 88.2188 85.5073 88.2188C84.8091 88.2188 84.1357 88.0525 83.4292 88.0109V88.2188H62.6562Z"
              fill="#386AD8"
            />
          </svg>

          <div className="flex flex-col text-white bg-blue-zodiac-500 rounded-full w-[300px] items-center py-2">
            <p className="font-monserrat text-center">
              Subir el Archivo para <br /> Subirlo a
            </p>
            <span className="flex items-center gap-x-3">
              <FolderIcon className="w-8 h-8 text-white" />
              {folder}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
