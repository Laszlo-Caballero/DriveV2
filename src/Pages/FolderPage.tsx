import { useQuery } from "../hooks/useQuery";
import axios from "axios";
import { config } from "../config/config";
import { ResponsiveFolders } from "../types/types";
import { useFolder } from "../Context/FolderContext";
import { useParams } from "react-router";
import Folder from "../Components/ui/Folder/Folder";
import File from "../Components/ui/File/Folder";

export default function FolderPage() {
  const { addFolder, deleteFile } = useFolder();

  const params: Readonly<
    Partial<{
      "*": string;
    }>
  > = useParams();

  const { data, isLoading } = useQuery<ResponsiveFolders>({
    queryFn: async () => {
      const responsive = await axios.get(
        `${config.apiUrl}/files/carpets/${params["*"]}`
      );
      return responsive.data;
    },
    dependencies: [addFolder, deleteFile, params],
  });

  if (isLoading) return <div className="w-full h-full p-4">loading...</div>;

  return (
    <div className="w-full h-full p-4 gap-y-4 flex flex-col py-[48px] px-[22px]">
      <h2 className="font-monserrat text-6xl">Unidad</h2>

      <div className="grid grid-cols-5 gap-y-3 gap-x-8">
        <h4 className="font-monserrat text-2xl col-span-5">Carpetas</h4>
        {data?.data.folders.map((folder, i) => (
          <Folder title={folder} key={i} />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-y-3 gap-x-8">
        <h4 className="font-monserrat text-2xl col-span-5">Archivos</h4>
        {data?.data.files.map((folder, i) => (
          <File title={folder} key={i} />
        ))}
      </div>
    </div>
  );
}
