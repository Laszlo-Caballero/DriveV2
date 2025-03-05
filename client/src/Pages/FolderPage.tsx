import { useQuery } from "../hooks/useQuery";
import axios from "axios";
import { config } from "../config/config";
import { ResponsiveFolders } from "../types/types";
import { useFolder } from "../Context/FolderContext";
import { useParams } from "react-router";
import Folder from "../Components/ui/Folder/Folder";
import File from "../Components/ui/File/Folder";
import { useDropzone } from "react-dropzone";
import DropFile from "../Components/ui/DropFile/DropFile";
import UploadFiles from "../Components/ui/UploadFiles/UploadFiles";
import { useState } from "react";
import { FileUpload, stateUpload } from "../interfaces/types";
import MenuClick from "@/Components/ui/MenuClick/MenuClick";

export default function FolderPage() {
  const { addFolder, deleteFile } = useFolder();

  const params: Readonly<
    Partial<{
      "*": string;
    }>
  > = useParams();

  console.log(params);

  const [files, setFiles] = useState<FileUpload[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFile: FileUpload[] = acceptedFiles.map((file) => ({
        file,
        state: stateUpload.uploading,
      }));

      setFiles((prev) => [...prev, ...newFile]);
    },
  });

  const { data, isLoading } = useQuery<ResponsiveFolders>({
    queryFn: async () => {
      const responsive = await axios.get(
        `${config.apiUrl}/files/carpets/${params["*"]}`,
      );
      return responsive.data;
    },
    dependencies: [addFolder, deleteFile, params, files],
  });

  const [open, setOpen] = useState({
    open: false,
    x: 0,
    y: 0,
  });

  if (isLoading) return <div className="h-full w-full p-4">loading...</div>;

  return (
    <div
      className="relative flex h-full w-full flex-col gap-y-4 p-4 px-[22px] py-[48px]"
      {...getRootProps({
        onClick: (e) => e.stopPropagation(),
        onContextMenu: (e) => {
          e.stopPropagation();
          e.preventDefault();
          console.log(e.clientX, e.clientY);
          setOpen({
            open: true,
            x: e.clientX,
            y: e.clientY,
          });
        },
      })}
    >
      {open.open && (
        <MenuClick
          x={open.x}
          y={open.y}
          closeFunction={() => {
            setOpen({
              open: false,
              x: 0,
              y: 0,
            });
          }}
        />
      )}

      <input className="hidden h-0 w-0" {...getInputProps()} />

      <h2 className="font-monserrat text-6xl">Unidad</h2>

      <div className="mt-8 flex grid-cols-5 flex-col gap-8 xl:grid">
        <h4 className="col-span-5 font-monserrat text-2xl">Carpetas</h4>
        {data?.data.folders.map((folder, i) => (
          <Folder title={folder} key={i} />
        ))}
      </div>
      <div className="mt-8 flex grid-cols-5 flex-col gap-8 xl:grid">
        <h4 className="col-span-5 font-monserrat text-2xl">Archivos</h4>
        {data?.data.files.map((folder, i) => <File title={folder} key={i} />)}
      </div>
      {isDragActive && <DropFile folder={params["*"] || "Carpeta"} />}
      {files.length > 0 && <UploadFiles files={files} setFiles={setFiles} />}
    </div>
  );
}
