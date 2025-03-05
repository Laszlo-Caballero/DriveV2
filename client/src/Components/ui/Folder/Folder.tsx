import { Link } from "react-router";
import { FolderIcon } from "../../../assets/icons/FileIcon";
import { MoreIcon } from "../../../assets/icons/MoreIcon";
import { useState } from "react";
import MenuFolder from "../MenuFolder/MenuFolder";
import ModalDelete from "@/forms/ModalDelete";

interface Props {
  title: string;
}

export default function Folder({ title }: Props) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div
      className="relative flex items-center justify-between rounded-2xl bg-blue-ribbon-300 px-5 py-3"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Link className="flex items-center gap-x-2" to={title}>
        <FolderIcon className="h-8 w-8 flex-shrink-0" />
        <p className="max-w-[200px] truncate font-monserrat text-xl">{title}</p>
      </Link>

      <MoreIcon
        className="h-6 w-4 flex-shrink-0 cursor-pointer"
        onClick={() => setOpen(true)}
      />

      {open && (
        <MenuFolder
          openDeleteModal={() => {
            setOpenDeleteModal(true);
            setOpen(false);
          }}
          closeFunction={() => {
            setOpen(false);
          }}
        />
      )}

      {openDeleteModal && (
        <ModalDelete
          title={title}
          closeFunction={() => setOpenDeleteModal(false)}
          type="Carpeta"
        />
      )}
    </div>
  );
}
