import { useState } from "react";
import { MoreIcon } from "../../../assets/icons/MoreIcon";
import { FolderIcon } from "./FolderParser";
import MenuFile from "../MenuFile/MenuFile";
import ModalDelete from "@/forms/ModalDelete";
import ModalRename from "@/forms/ModalRename";

interface Props {
  title: string;
}

export default function File({ title }: Props) {
  const [open, setOpen] = useState(false);

  const [modalRename, setModalRename] = useState(false);
  const [modalMove, setModalMove] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  return (
    <div
      className="relative flex items-center justify-between rounded-2xl bg-blue-ribbon-300 px-5 py-3"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <span className="flex items-center gap-x-2">
        {FolderIcon(title)}
        <p className="max-w-[50px] truncate font-monserrat text-xl xl:max-w-[90px] 2xl:max-w-[170px]">
          {title}
        </p>
      </span>

      <MoreIcon
        className="h-6 w-4 flex-shrink-0 cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <MenuFile
          closeFunction={() => setOpen(false)}
          title={title}
          openDeleteModal={() => setModalDelete(true)}
          openChangeNameModal={() => setModalRename(true)}
        />
      )}

      {modalDelete && (
        <ModalDelete
          closeFunction={() => {
            setModalDelete(false);
          }}
          title={title}
        />
      )}

      {modalRename && (
        <ModalRename title={title} onClose={() => setModalRename(false)} />
      )}
    </div>
  );
}
