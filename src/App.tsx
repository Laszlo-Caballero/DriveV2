import Header from "./Components/layout/Header";
import FolderRouter from "./Routes/FolderRouter";

function App() {
  return (
    <div className="flex">
      <div className="flex flex-col min-h-screen flex-1 w-full bg-shadow-green-50">
        <Header />
        <FolderRouter />
      </div>
    </div>
  );
}

export default App;
