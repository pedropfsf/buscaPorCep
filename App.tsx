// Main
import Core from "./src";

// Context
import { CepProvider } from "./src/contexts/cepContext";

export default function App() {
  return (
    <CepProvider>
      <Core/>
    </CepProvider>
  );
}