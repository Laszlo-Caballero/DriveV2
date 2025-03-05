import Input from "@/Components/ui/Input/Input";
import Modal from "@/Components/ui/Modal/Modal";
import { Toast } from "@/Components/ui/Toaster/ToasterProvider";
import { config } from "@/config/config";
import { useFolder } from "@/Context/FolderContext";
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
  const { addFolder, setAddFolder } = useFolder();
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
      setAddFolder(!addFolder);
    } catch {
      toast.error("Error al renombrar el archivo");
    }
  };
  return (
    <Modal
      title="Renombrar"
      closeFunction={onClose}
      onSubmit={onSubmit}
      Element="form"
    >
      <Input
        errors={errors}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del archivo"
      />
    </Modal>
  );
}
