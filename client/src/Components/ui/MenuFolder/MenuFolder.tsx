import { TrashIcon } from "@/assets/icons/TrashIcon";
import Option from "../MenuFile/Option";

interface Props {
  closeFunction?: () => void;
  openDeleteModal?: () => void;
}

export default function MenuFolder({ openDeleteModal }: Props) {
  return (
    <>
      <div className="absolute right-0 top-full z-10 flex -translate-y-3 flex-col rounded-xl bg-blue-zodiac-100 font-monserrat text-xl">
        <Option
          icon={<TrashIcon />}
          label="Eliminar"
          onClick={() => openDeleteModal?.()}
        />
      </div>
    </>
  );
}
