import { useEffect, useState } from "react";
import { Home } from "@/pages/Home";
import { Admin } from "@/pages/Admin";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  /**
   * Observa mudanças na URL
   */
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Escuta mudanças no histórico do navegador
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  /**
   * Roteamento simples baseado no caminho
   */
  if (currentPath === "/admin") {
    return <Admin />;
  }

  return <Home />;
}

export default App;
