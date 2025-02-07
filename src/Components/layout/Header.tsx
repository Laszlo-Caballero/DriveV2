import { useFolder } from "../../Context/FolderContext";
import Button from "../ui/Button/Button";

export default function Header() {
  const { setAddFolderBoolean } = useFolder();

  return (
    <nav className="w-full flex items-center gap-x-4 p-4 bg-shadow-green-400 text-white">
      <Button>Subir Archivo</Button>
      <Button onClick={() => setAddFolderBoolean(true)}>Crear Carpeta</Button>
    </nav>
  );
}
