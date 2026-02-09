import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Admin } from "@/pages/Admin";

function App() {
  return (
    <BrowserRouter>
      {/* 2. O componente Routes agrupa suas decisões de rota */}
      <Routes>
        {/* 3. Se a URL for "/admin", renderiza <Admin /> */}
        <Route path="/admin" element={<Admin />} />

        {/* 4. Para qualquer outra coisa (ou a raiz), renderiza <Home /> */}
        <Route path="/" element={<Home />} />

        {/* Dica: Se quiser que Home apareça em qualquer rota desconhecida, use path="*" */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
