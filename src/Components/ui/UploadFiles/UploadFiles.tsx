import { useParams } from "react-router";
import { ChevronDownIcon } from "../../../assets/icons/ChevronDownIcon";
import { CrossIcon } from "../../../assets/icons/CrossIcon";
import { LoadIcon } from "../../../assets/icons/LoadIcon";
import { FolderIcon } from "../File/FolderParser";
import { config } from "../../../config/config";
import axios from "axios";
import { sleep } from "../../../utils/sleep";
import { useCallback, useEffect } from "react";
import { FileUpload, stateUpload } from "../../../interfaces/types";
import { CheckIcon } from "../../../assets/icons/CheckIcon";

interface Props {
  files: FileUpload[];
  setFiles?: (files: FileUpload[]) => void;
}

export default function UploadFiles({ files, setFiles }: Props) {
  const params: Readonly<
    Partial<{
      "*": string;
    }>
  > = useParams();

  const uploadFiles = useCallback(async () => {
    files.forEach(async (data) => {
      const formData = new FormData();
      formData.append("files", data.file);
      try {
        await axios.post(
          `${config.apiUrl}/files/upload/${params["*"]}`,
          formData
        );

        const findFile = files.map((data) =>
          data.file.name === data.file.name
            ? { file: data.file, state: stateUpload.done }
            : data
        );

        setFiles?.(findFile);
        await sleep(500);
        setFiles?.(files.filter((file) => file.file.name !== data.file.name));
      } catch {
        const findFile = files.map((data) =>
          data.file.name === data.file.name
            ? { file: data.file, state: stateUpload.error }
            : data
        );
        setFiles?.(findFile);
        await sleep(500);
        setFiles?.(files.filter((file) => file.file.name !== data.file.name));
      }
    });
  }, [files, params, setFiles]);

  useEffect(() => {
    uploadFiles();
  }, [files, uploadFiles]);

  return (
    <div className="w-[448px] flex flex-col fixed bottom-0 right-16 rounded-t-3xl bg-blue-zodiac-50">
      <header className="px-[32px] py-[24px] rounded-t-3xl bg-blue-zodiac-100 flex items-center justify-between">
        <p className="font-monserrat text-xl">
          Subiendo {files.length} archvios
        </p>
        <div className="flex items-center gap-x-4">
          <ChevronDownIcon className="w-6 h-6 " strokeWidth={3} />
          <CrossIcon className="w-6 h-6" strokeWidth={2} />
        </div>
      </header>
      <nav className="px-[32px] flex items-center py-2 justify-between bg-blue-zodiac-400 bg-opacity-50">
        <p className="font-monserrat">Iniciando...</p>
        <p className="font-monserrat-semibold text-blue-zodiac-800 cursor-pointer">
          Cancelar
        </p>
      </nav>
      {files.map((data, i) => (
        <div
          key={i}
          className="flex items-center gap-x-4 px-[32px] justify-between py-4"
        >
          <span className="flex gap-x-2 items-center">
            {FolderIcon(data.file.name)}
            <p>{data.file.name}</p>
          </span>

          {data.state === stateUpload.uploading && (
            <LoadIcon className="w-4 h-4 text-blue-zodiac-800" />
          )}
          {data.state === stateUpload.done && (
            <CheckIcon className="w-4 h-4 text-[#30C220]" />
          )}
        </div>
      ))}
    </div>
  );
}
