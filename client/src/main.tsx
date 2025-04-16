import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/ipass-theme.css"; // Importando o tema personalizado da iPass

createRoot(document.getElementById("root")!).render(
  <App />
);
