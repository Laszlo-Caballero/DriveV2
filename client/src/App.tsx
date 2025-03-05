import Aside from "./Components/layout/Aside";
import FolderRouter from "./Routes/FolderRouter";

function App() {
  return (
    <div className="flex">
      <div className="flex min-h-screen flex-1 w-full bg-shadow-green-50">
        <Aside />
        <FolderRouter />
      </div>
    </div>
  );
}

export default App;
