import AppRouter from "./routes/AppRouter";
import { ModalProvider } from "./contexts/ModalContext";
import AppInitializer from "./components/AppInitializer";

function App() {

  return (
    <ModalProvider>
      <AppInitializer />
      <AppRouter />
    </ModalProvider>
  );
}

export default App;
