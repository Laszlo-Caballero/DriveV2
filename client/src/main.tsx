import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { FolderProvider } from "./Context/FolderContext.tsx";
import { ToasterProvider } from "./Components/ui/Toaster/ToasterProvider.tsx";
import { Toaster } from "./Components/ui/Toaster/Toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <FolderProvider>
    <ToasterProvider>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>

      <Toaster position="top-right" size="lg" />
    </ToasterProvider>
  </FolderProvider>
);
