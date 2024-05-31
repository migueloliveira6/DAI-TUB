import { useState } from "react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { SubNavBar } from "../components/SubNavBar";
import { Estacoes } from "./sub-pages/Estacoes";


/*
* Ligar a base de dados
* Criar Pagina Autocarros
*/


export function GerirLinhas() {
  const [currentPage, setCurrentPage] = useState("Estacoes");

  return (
    <div className="h-full max-w-[100dvw]">
      <Navbar page={2} />
      <SubNavBar currentPage={currentPage} onPageChange={setCurrentPage}>
        <Button page="Estacoes" text="Gerir Estacoes" className={`bg-neutral-700 hover:scale-105 ${currentPage == "Estacoes" ? "border-blue-700" : "border-neutral-800"}`} />
        <Button page="Autocarros" text="Autocarros" className={`bg-neutral-700 hover:scale-105 ${currentPage == "Autocarros" ? "border-blue-700" : "border-neutral-700"}`} />
      </SubNavBar>
      <div>
        {currentPage === "Estacoes" && <Estacoes />}
        {/* {currentPage === "Autocarros" && <Autocarros />} */}
      </div>
    </div>
  );
}