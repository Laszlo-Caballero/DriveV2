import Modal from "@/Components/ui/Modal/Modal";
import { Toast } from "@/Components/ui/Toaster/ToasterProvider";
import { config } from "@/config/config";
import { useFolder } from "@/Context/FolderContext";
import { cn } from "@/utils/cn";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useParams } from "react-router";

interface Props {
  title: string;
  onClose: () => void;
}

export default function ModalRename({ title, onClose }: Props) {
  const [name, setName] = useState(title.split(".")[0]);
  const [errors, setErrors] = useState<string>("");
  const toast = Toast();

  const params: Readonly<
    Partial<{
      "*": string;
    }>
  > = useParams();
  const { addFolder, setAddFolderBoolean } = useFolder();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors("");
    if (name === "") {
      setErrors("El nombre no puede estar vacío");
      return;
    }

    try {
      await axios.put(`${config.apiUrl}/files/rename/${params["*"]}`, {
        name: title,
        newName: `${name}.${title.split(".")[1]}`,
      });
      toast.success("Archivo renombrado correctamente");
      onClose();
      setAddFolderBoolean(!addFolder);
    } catch {
      toast.error("Error al renombrar el archivo");
    }
  };
  console.log(errors);
  return (
    <Modal
      title="Renombrar"
      closeFunction={onClose}
      submitFunction={() => {}}
      onSubmit={onSubmit}
      Element="form"
    >
      <input
        type="text"
        className={cn(
          "w-[500px] rounded-lg border border-black bg-transparent p-2 text-black placeholder:text-black",
          errors && "border-red-500 text-red-500 placeholder:text-red-500",
        )}
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors && <p className="text-red-500">{errors}</p>}
    </Modal>
  );
}
