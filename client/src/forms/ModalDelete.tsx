import Modal from "@/Components/ui/Modal/Modal";
import { Toast } from "@/Components/ui/Toaster/ToasterProvider";
import { config } from "@/config/config";
import { useFolder } from "@/Context/FolderContext";
import axios from "axios";
import { useParams } from "react-router";

interface Props {
  closeFunction: () => void;
  title: string;
  type?: string;
}

export default function ModalDelete({
  title,
  closeFunction,
  type = "Archivo",
}: Props) {
  const params: Readonly<
    Partial<{
      "*": string;
    }>
  > = useParams();

  const { setDeleteFile, deleteFile } = useFolder();
  const toast = Toast();
  const deleteFunction = async () => {
    try {
      const res = await axios.delete(
        `${config.apiUrl}/files/remove/${params["*"]}`,
        {
          data: {
            name: title,
          },
        },
      );
      if (res.status != 200) throw new Error("Error al eliminar el archivo");

      toast.success(`${type} eliminado correctamente`);
      closeFunction();
      setDeleteFile(!deleteFile);
    } catch {
      toast.error(`Error al eliminar el ${type}`);
    }
  };

  return (
    <Modal
      title={`¿Desea Eliminar ${title}?`}
      closeFunction={closeFunction}
      submitFunction={deleteFunction}
    />
  );
}
