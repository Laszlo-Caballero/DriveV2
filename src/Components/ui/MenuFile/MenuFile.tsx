import Option from "./Option";
import { DownloadIcon } from "@/assets/icons/DownloadIcon";
import { RenameIcon } from "@/assets/icons/RenameIcon";
import { MoveFolderIcon } from "@/assets/icons/MoveFolderIcon";
import { TrashIcon } from "@/assets/icons/TrashIcon";
import { useMenuFile } from "./hook/useMenuFile";

interface Props {
  closeFunction?: () => void;
  title: string;
  openChangeNameModal?: () => void;
  openMoveModal?: () => void;
  openDeleteModal?: () => void;
}

export default function MenuFile({
  closeFunction,
  title,
  openChangeNameModal,
  openDeleteModal,
  openMoveModal,
}: Props) {
  const { handleDownload, ref } = useMenuFile({ closeFunction, title });

  return (
    <>
      <div
        className="absolute right-0 top-full z-10 flex -translate-y-3 flex-col rounded-xl bg-blue-zodiac-100 font-monserrat text-xl"
        ref={ref}
      >
        <section className="flex flex-col border-b border-black">
          <Option
            icon={<DownloadIcon />}
            label="Descargar"
            onClick={handleDownload}
          />
          <Option
            icon={<RenameIcon />}
            label="Cambiar Nombre"
            onClick={() => openChangeNameModal?.()}
          />
        </section>
        <section className="flex flex-col border-b">
          <Option
            icon={<MoveFolderIcon />}
            label="Mover"
            onClick={() => openMoveModal?.()}
          />
          <Option
            icon={<TrashIcon />}
            label="Eliminar"
            onClick={() => openDeleteModal?.()}
          />
        </section>
      </div>
    </>
  );
}
