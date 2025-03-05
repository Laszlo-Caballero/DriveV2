import Input from "@/Components/ui/Input/Input";
import Modal from "@/Components/ui/Modal/Modal";
import { Toast } from "@/Components/ui/Toaster/ToasterProvider";
import { config } from "@/config/config";
import { useFolder } from "@/Context/FolderContext";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useParams } from "react-router";

interface Props {
  onClose: () => void;
}

export default function ModalNewFolder({ onClose }: Props) {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<string>("");
  const toast = Toast();

  const params: Readonly<
    Partial<{
      "*": string;
    }>
  > = useParams();

  console.log(params);

  const { addFolder, setAddFolder } = useFolder();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors("");
    if (name === "") {
      setErrors("El nombre no puede estar vacío");
      return;
    }

    try {
      await axios.post(`${config.apiUrl}/files/folder/${params["*"]}`, {
        name: name,
      });
      toast.success("Nueva Carpeta Creada con exito");
      onClose();
      setAddFolder(!addFolder);
    } catch {
      toast.error("Error al crear la carpeta");
    }
  };
  return (
    <Modal
      Element="form"
      title="Nueva Carpeta"
      closeFunction={onClose}
      onSubmit={onSubmit}
    >
      <Input
        placeholder="Nombre de la carpeta"
        errors={errors}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Modal>
  );
}
