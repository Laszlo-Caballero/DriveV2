import { useFolder } from "../../Context/FolderContext";
import Button from "../ui/Button/Button";

export default function Header() {
  const { setAddFolder } = useFolder();

  return (
    <nav className="flex w-full items-center gap-x-4 bg-shadow-green-400 p-4 text-white">
      <Button>Subir Archivo</Button>
      <Button onClick={() => setAddFolder(true)}>Crear Carpeta</Button>
    </nav>
  );
}
