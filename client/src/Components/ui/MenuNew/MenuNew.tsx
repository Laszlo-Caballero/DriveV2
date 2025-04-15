import { UploadFolder } from "@/assets/icons/UploadFolder";
import Option from "../MenuFile/Option";
import { UploadFileModal } from "@/assets/icons/UploadFileModal";
import { useCloseDiv } from "@/hooks/useCloseDiv";
import { useRef, useState } from "react";
import ModalNewFolder from "@/forms/ModalNewFolder";
import { useFolder } from "@/Context/FolderContext";
import { useParams } from "react-router";
import axios from "axios";
import { config } from "@/config/config";
import { Toast } from "../Toaster/ToasterProvider";
import { cx } from "class-variance-authority";
import { useMutation } from "@/hooks/useMutation";
import Load from "../Load/Load";

interface Props {
  closeFunction?: () => void;
  className?: string;
}

export default function MenuNew({ className, closeFunction }: Props) {
  const ref = useCloseDiv({ closeFunction });
  const [openNewFolder, setOpenNewFolder] = useState(false);
  const refInput = useRef<HTMLInputElement>(null);
  const toast = Toast();

  const { addFolder, setAddFolder } = useFolder();
  const params: Readonly<
    Partial<{
      "*": string;
    }>
  > = useParams();
  const { mutate, isLoading } = useMutation<unknown, { data: File }>({
    mutationFn: async ({ data }) => {
      const formData = new FormData();
      formData.append("files", data);
      await axios.post(
        `${config.apiUrl}/files/upload/${params["*"]}`,
        formData,
      );
    },
    onSuccess: () => {
      toast.success("Archivo subido correctamente");
      setAddFolder(!addFolder);
      closeFunction?.();
    },
    onError: () => {
      toast.error("Error al subir el archivo");
    },
  });

  if (isLoading) {
    console.log("loading...");
    return <Load />;
  }

  return (
    <div
      className={cx(
        "z-10 flex flex-col rounded-xl bg-blue-zodiac-100 font-monserrat text-xl",
        className,
      )}
      ref={ref}
    >
      <input
        type="file"
        className="hidden"
        ref={refInput}
        onChange={async (e) => {
          const files = e.target.files;
          if (files) {
            const file = files[0];
            mutate({ data: file });
          }
        }}
        multiple={false}
      />

      <Option
        icon={<UploadFolder strokeWidth={2} />}
        label="Crear Carpeta"
        onClick={() => {
          setOpenNewFolder(true);
        }}
      />
      <Option
        icon={<UploadFileModal strokeWidth={2} />}
        label="Subir Archivo"
        onClick={() => {
          refInput.current?.click();
        }}
      />

      {openNewFolder && (
        <ModalNewFolder
          onClose={() => {
            setOpenNewFolder(false);
          }}
        />
      )}
    </div>
  );
}
