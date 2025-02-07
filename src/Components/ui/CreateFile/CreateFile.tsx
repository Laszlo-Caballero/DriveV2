import { useState } from "react";
import { CheckIcon } from "../../../assets/icons/CheckIcon";
import { CrossIcon } from "../../../assets/icons/CrossIcon";
import { FolderIcon } from "../../../assets/icons/FileIcon";
import { useFolder } from "../../../Context/FolderContext";
import { useMutation } from "../../../hooks/useMutation";
import axios from "axios";
import { config } from "../../../config/config";
import { Toast } from "../Toaster/ToasterProvider";

export default function CreateFile() {
  const { setAddFolderBoolean } = useFolder();
  const [value, setValue] = useState<string>("");

  const toast = Toast();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${config.apiUrl}/files/folder/`, {
        name: value,
      });

      return res.data;
    },

    onSuccess: () => {
      setAddFolderBoolean(false);
      toast.success("Carpeta creada correctamente");
    },
    onError: () => {
      setAddFolderBoolean(false);
      toast.error("Error al crear la carpeta");
    },
  });

  return (
    <div className="w-full flex items-center gap-x-4 p-4 rounded-full bg-shadow-green-700 text-white">
      <FolderIcon className="w-8 h-8 text-white" />
      <input
        type="text"
        className="w-full bg-transparent text-white outline-none"
        placeholder="Nombre del archivo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <CheckIcon
        className="w-8 h-8 text-white cursor-pointer"
        onClick={() => {
          mutate();
        }}
      />

      <CrossIcon
        className="w-8 h-8 text-white cursor-pointer"
        onClick={() => setAddFolderBoolean(false)}
      />
    </div>
  );
}
