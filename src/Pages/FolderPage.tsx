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

export default function FolderPage() {
  const { addFolder, deleteFile } = useFolder();

  const params: Readonly<
    Partial<{
      "*": string;
    }>
  > = useParams();

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
        `${config.apiUrl}/files/carpets/${params["*"]}`
      );
      return responsive.data;
    },
    dependencies: [addFolder, deleteFile, params, files],
  });

  if (isLoading) return <div className="w-full h-full p-4">loading...</div>;

  return (
    <div
      className="w-full h-full p-4 gap-y-4 flex flex-col py-[48px] px-[22px] relative"
      {...getRootProps({ onClick: (e) => e.stopPropagation() })}
    >
      <input className="hidden w-0 h-0" {...getInputProps()} />

      <h2 className="font-monserrat text-6xl">Unidad</h2>

      <div className="grid grid-cols-5 gap-8 mt-8">
        <h4 className="font-monserrat text-2xl col-span-5">Carpetas</h4>
        {data?.data.folders.map((folder, i) => (
          <Folder title={folder} key={i} />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-8 mt-8">
        <h4 className="font-monserrat text-2xl col-span-5">Archivos</h4>
        {data?.data.files.map((folder, i) => (
          <File title={folder} key={i} />
        ))}
      </div>
      {isDragActive && <DropFile folder={params["*"] || "Carpeta"} />}
      {files.length > 0 && <UploadFiles files={files} setFiles={setFiles} />}
    </div>
  );
}
