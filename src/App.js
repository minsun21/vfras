import AppRouter from "./routes/AppRouter";
import { ModalProvider } from "./contexts/ModalContext";
import AppInitializer from "./components/AppInitializer";
import Loader from "./components/Loader";

function App() {

  return (
    <ModalProvider>
      <AppInitializer />
      <Loader />
      <AppRouter />
    </ModalProvider>
  );
}

export default App;
