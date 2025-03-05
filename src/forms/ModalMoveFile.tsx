import { FolderOutLineIcon } from "@/assets/icons/FolderOutLineIcon";
import FolderSelected from "@/Components/ui/FolderSelected/FolderSelected";
import Modal from "@/Components/ui/Modal/Modal";
import { config } from "@/config/config";
import { useForm } from "@/hooks/useForms";
import { useQuery } from "@/hooks/useQuery";
import { ResponsiveFolder } from "@/types/types";
import axios from "axios";
import { useParams } from "react-router";
import { MoveFileSchema } from "./Schema/MoveFile.schema";
import { z } from "zod";
import { useMutation } from "@/hooks/useMutation";
import { Toast } from "@/Components/ui/Toaster/ToasterProvider";
import { useFolder } from "@/Context/FolderContext";

interface Props {
  file?: string;
  onClose?: () => void;
}

export default function ModalMoveFile({ file, onClose }: Props) {
  const params: Readonly<
    Partial<{
      "*": string;
    }>
  > = useParams();

  const { data, isLoading } = useQuery<ResponsiveFolder>({
    queryFn: async () => {
      const res = await axios.get(
        `${config.apiUrl}/files/folder/${params["*"]}`,
      );
      return res.data;
    },
  });
  const { addFolder, setAddFolder } = useFolder();

  const { setValue, handleSubmit, values, errors } = useForm<
    z.infer<typeof MoveFileSchema>
  >({
    initialValues: {
      folder: "",
    },
    zodSchema: MoveFileSchema,
  });

  const toast = Toast();
  const { mutate } = useMutation({
    mutationFn: async ({ folder }: z.infer<typeof MoveFileSchema>) => {
      await axios.put(`${config.apiUrl}/files/move/${params["*"]}`, {
        name: file,
        folder: folder,
      });
    },
    onSuccess: () => {
      setAddFolder(!addFolder);
      onClose?.();
      toast.success("Archivo movido correctamente");
    },
    onError: () => {
      toast.error("Error al mover el archivo");
    },
  });

  const onSubmit = async (data: z.infer<typeof MoveFileSchema>) => {
    mutate(data);
  };

  return (
    <Modal
      Element="form"
      title={`Mover ${file}`}
      onSubmit={handleSubmit(onSubmit)}
      closeFunction={onClose}
    >
      <div className="flex w-full items-center gap-x-5 border-b border-black py-2">
        <p>Ubicacion Actual</p>
        <span className="flex w-[150px] items-center gap-x-3 rounded-full border border-black px-4 py-1">
          <FolderOutLineIcon className="h-6 w-6 text-blue-zodiac-700" />
          {params["*"] == "" ? "Home" : params["*"]?.split("/").pop()}
        </span>
      </div>

      <div className="flex flex-col gap-y-2 pb-6 pt-2">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          data?.data.map((folder) => {
            return (
              <FolderSelected
                folder={folder}
                onClick={() => setValue("folder", folder)}
                selected={folder == values.folder}
              />
            );
          })
        )}

        <p className="font-monserrat text-sm text-red-600">{errors?.folder}</p>
      </div>
    </Modal>
  );
}
