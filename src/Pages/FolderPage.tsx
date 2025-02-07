import { useQuery } from "../hooks/useQuery";
import axios from "axios";
import { config } from "../config/config";
import { ResponsiveFolders } from "../types/types";
import File from "../Components/ui/File/File";
import { useFolder } from "../Context/FolderContext";
import CreateFile from "../Components/ui/CreateFile/CreateFile";
import { useParams } from "react-router";

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
    <div className="w-full h-full p-4 gap-y-4 flex flex-col">
      {addFolder && <CreateFile />}
      {data?.data.map((folder, i) => {
        return <File title={folder} key={i} />;
      })}
    </div>
  );
}
