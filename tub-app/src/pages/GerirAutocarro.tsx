import { Navbar } from "../components/Navbar";
import { useEffect, useState, FormEvent } from "react";
import {
  fetchAutocarros,
  postAutocarro,
  removeAutocarro,
} from "../services/AutocarroManagment";

interface Autocarro {
  matricula: string;
  marca: string;
  modelo: string;
  ano_de_fabrico: number;
  lugares: number;
  numero_linha: number;
}

export function GerirAutocarro() {
  const [autocarros, setAutocarros] = useState<Autocarro[]>([]);
  const [marca, setMarca] = useState<string>("");
  const [matricula, setMatricula] = useState<string>("");
  const [linha, setLinha] = useState<number>(0);
  const [lugares, setLugares] = useState<number>(0);
  const [modelo, setModelo] = useState<string>("");
  const [anoFabrico, setAnoFabrico] = useState<number>(0); // Ajuste para o tipo correto

  useEffect(() => {
    carregarAutocarros();
  }, []);

  const carregarAutocarros = async () => {
    try {
      let data = await fetchAutocarros();
      setAutocarros(data);
    } catch (error: any) {
      console.error("Erro ao carregar autocarros:", error.message);
    }
  };


  const handleAddAutocarro = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const novoAutocarro: Autocarro = {
      matricula: matricula,
      marca: marca,
      modelo: modelo,
      ano_de_fabrico: anoFabrico, // Converte para string se necessário
      lugares: lugares,
      numero_linha: linha,
    };



    try {
      await postAutocarro(novoAutocarro);
      carregarAutocarros(); // Atualiza a lista de autocarros após adicionar
    } catch (error: any) {
      console.error("Erro ao adicionar autocarro:", error.message);
    }
  };


  const removerAutocarro = async (matricula: string) => {
    try {
      // Implemente a função para remover o autocarro na API
      await removeAutocarro(matricula);
      setAutocarros(autocarros.filter((auto) => auto.matricula !== matricula));
    } catch (error: any) {
      console.error("Erro ao remover autocarro:", error.message);
      alert(
        "Erro ao remover autocarro. Verifique o console para mais detalhes."
      );
    }
  };

  return (
    <div className="h-full">
      <Navbar page={3} />
      <div className="bg-[#171717] min-h-[calc(100dvh-6rem)] flex justify-center items-center">
        <div className="container flex justify-evenly flex-col bg-white p-8 rounded-lg shadow-lg max-w-2xl">
          <h2 className="text-center text-2xl font-bold mb-6">
            Gestão de Autocarros
          </h2>
          <form
            onSubmit={handleAddAutocarro}
            id="addForm"
            className="space-y-4"
          >
            <input
              type="text"
              id="marca"
              className="w-full p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 "
              placeholder="Marca"
              onChange={(e) => setMarca(e.target.value)}
            />
            <input
              type="text"
              id="matricula"
              className="w-full p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Matrícula (6 caracteres)"
              pattern="[A-Za-z0-9]{6}"
              onChange={(e) => setMatricula(e.target.value)}
            />
            <input
              type="text"
              id="linha"
              className="w-full p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 "
              placeholder="Linha"
              onChange={(e) => setLinha(parseInt(e.target.value))}
            />
            <input
              type="number"
              id="lugares"
              className="w-full p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Lugares"
              min="1"
              step="1"
              onChange={(e) => setLugares(parseInt(e.target.value))}
            />
            <input
              type="text"
              id="modelo"
              className="w-full p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 "
              placeholder="Modelo"
              onChange={(e) => setModelo(e.target.value)}
            />
            <select
              id="anoFabrico"
              className="w-full p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={anoFabrico}
              onChange={(e) => setAnoFabrico(parseInt(e.target.value))}
            >
              <option value="">Ano de Fabrico</option>
              {Array.from({ length: 2024 - 1990 }, (_, i) => (
                <option key={i} value={1990 + i}>
                  {1990 + i}
                </option>
              ))}
            </select>
            <input
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
              value="Adicionar Autocarro"
            />
          </form>
          <table className="w-full mt-6 border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Marca</th>
                <th className="border p-2">Matrícula</th>
                <th className="border p-2">Linha</th>
                <th className="border p-2">Lugares</th>
                <th className="border p-2">Modelo</th>
                <th className="border p-2">Ano de Fabrico</th>
                <th className="border p-2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {autocarros != null
                ? autocarros.map((autocarro, index) => (
                    <tr key={index}>
                      <td className="border p-2">{autocarro.marca}</td>
                      <td className="border p-2">{autocarro.matricula}</td>
                      <td className="border p-2">{autocarro.numero_linha}</td>
                      <td className="border p-2">{autocarro.lugares}</td>
                      <td className="border p-2">{autocarro.modelo}</td>
                      <td className="border p-2">{autocarro.ano_de_fabrico}</td>
                      <td className="border p-2 text-center">
                        <button
                          onClick={() => removerAutocarro(autocarro.matricula)}
                          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
