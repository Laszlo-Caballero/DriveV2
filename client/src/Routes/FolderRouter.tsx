import { Route, Routes } from "react-router";
import FolderPage from "../Pages/FolderPage";
import Aside from "@/Components/layout/Aside";

export default function FolderRouter() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <>
            <Aside />
            <FolderPage />
          </>
        }
      />
    </Routes>
  );
}
