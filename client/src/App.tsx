import FolderRouter from "./Routes/FolderRouter";

function App() {
  return (
    <div className="flex">
      <div className="flex min-h-screen w-full flex-1 flex-col bg-shadow-green-50 lg:flex-row">
        <FolderRouter />
      </div>
    </div>
  );
}

export default App;
