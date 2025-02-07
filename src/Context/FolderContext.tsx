import { createContext, PropsWithChildren, useContext, useState } from "react";

type FolderContextType = {
  addFolder: boolean;
  setAddFolderBoolean: (value: boolean) => void;
  deleteFile: boolean;
  setDeleteFile: (value: boolean) => void;
};

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export function FolderProvider({ children }: PropsWithChildren) {
  const [addFolder, setAddFolder] = useState(false);
  const [deleteFile, setDeleteFile] = useState(false);

  const setAddFolderBoolean = (value: boolean) => {
    setAddFolder(value);
  };

  return (
    <FolderContext.Provider
      value={{ addFolder, setAddFolderBoolean, deleteFile, setDeleteFile }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export const useFolder = () => {
  const context = useContext(FolderContext);
  if (context === undefined) {
    throw new Error("useFolder must be used within a FolderProvider");
  }
  return context;
};
