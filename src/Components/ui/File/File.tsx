import { Link, useParams } from "react-router";
import { useState } from "react";
import { MoreIcon } from "../../../assets/icons/MoreIcon";
import { OutsideContainer } from "../../../hooks/OutsideClick";
import { DownloadIcon } from "../../../assets/icons/DownloadIcon";
import { TrashIcon } from "../../../assets/icons/TrashIcon";
import { fileIcon } from "./FileIcon";
import { DonwloadFile } from "./DownloadFile";
import { useMutation } from "../../../hooks/useMutation";
import axios from "axios";
import { config } from "../../../config/config";
import { Toast } from "../Toaster/ToasterProvider";
import { useFolder } from "../../../Context/FolderContext";

interface Props {
  title: string;
}

export default function File({ title }: Props) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const params: Readonly<
    Partial<{
      "*": string;
    }>
  > = useParams();

  const { deleteFile, setDeleteFile } = useFolder();

  const toast = Toast();

  const { mutate } = useMutation({
    mutationFn: async (data: { file: string }) => {
      const res = await axios.delete(
        `${config.apiUrl}/files/remove/${params["*"]}`,
        {
          data: {
            name: data.file,
          },
        }
      );

      return res.data;
    },
    onSuccess: () => {
      toast.success("Archivo eliminado correctamente");
      setDeleteFile(!deleteFile);
    },
    onError: () => {
      toast.error("Error al eliminar el archivo");
    },
  });

  if (!title.includes(".")) {
    return (
      <Link to={`${title}`}>
        <div className="w-full flex items-center gap-x-4 p-4 rounded-full bg-shadow-green-700 text-white">
          {fileIcon(title)}
          {title}
        </div>
      </Link>
    );
  }

  return (
    <div
      className="w-full flex items-center justify-between p-4 rounded-full bg-shadow-green-700 text-white relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center gap-x-4">
        {fileIcon(title)}

        {title}
      </div>

      {hover && (
        <MoreIcon
          className="w-8 h-8 text-white cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      )}

      {open && (
        <OutsideContainer
          setIsOpen={setOpen}
          className="absolute w-[150px]  right-4 top-full -translate-y-6 z-10"
        >
          <div className="w-full h-full rounded-xl bg-shadow-green-600 ">
            <span
              className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-shadow-green-700"
              onClick={async () => {
                await DonwloadFile({
                  file: title,
                  path: params["*"] ?? "",
                });
                setOpen(false);
              }}
            >
              <DownloadIcon className="w-8 h-8 text-white" />
              Descargar
            </span>

            <span
              className="flex items-center gap-x-4 p-4 cursor-pointer hover:bg-shadow-green-700"
              onClick={() => {
                mutate({ file: title });
              }}
            >
              <TrashIcon className="w-8 h-8 text-white" />
              Eliminar
            </span>
          </div>
        </OutsideContainer>
      )}
    </div>
  );
}
