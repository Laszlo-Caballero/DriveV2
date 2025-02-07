import { Route, Routes } from "react-router";
import FolderPage from "../Pages/FolderPage";

export default function FolderRouter() {
  return (
    <Routes>
      <Route path="/*" element={<FolderPage />} />
    </Routes>
  );
}
