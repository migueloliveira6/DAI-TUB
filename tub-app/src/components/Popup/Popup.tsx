import { useState } from "react";
import { Selector } from "../Selector/Selector";
import { Option } from "../Selector/Option";
import { X } from "lucide-react";

interface Station {
  id_estacao: number;
  nome_estacao: string;
  CoordenadasN: string;
  CoordenadasS: string;
  numero_linha: number;
}

interface PopupProps {
  onClick?: (
    e: React.MouseEvent<SVGSVGElement> | React.FormEvent<HTMLFormElement>
  ) => void;
  stations?: Station[];
  onAddStation: (station: Station) => void;
}

export function Popup(props: PopupProps) {
  const { onAddStation } = props;

  const handleOptionClick = (newPlaceholder: string) => {
    // Extrai o número da linha depois de "BRT "
    const line = parseInt(newPlaceholder.split(" ")[2]);
    console.log(newPlaceholder)

    // Atualiza o estado com o número da linha
    setFormData((prevData) => ({
      ...prevData,
      numero_linha: line, // Corrige aqui para atribuir a linha corretamente
    }));
  };

  const [formData, setFormData] = useState({
    id_estacao: 0, // Usando timestamp como ID único (melhor opção se você não tem um ID único gerado pelo servidor)
    nome_estacao: "",
    CoordenadasN: "",
    CoordenadasS: "",
    numero_linha: 0,
  });

  const handleAddStation = () => {
    // Cria um novo objeto Station com base nos dados do formulário
    const nextId = props.stations && props.stations.length > 0 ? Math.max(...props.stations.map((station) => station.id_estacao)) + 1 : 1;

    const newStation: Station = {
      id_estacao: nextId, // Usando timestamp como ID único (melhor opção se você não tem um ID único gerado pelo servidor)
      nome_estacao: formData.nome_estacao,
      CoordenadasN: formData.CoordenadasN,
      CoordenadasS: formData.CoordenadasS,
      numero_linha: formData.numero_linha,
    };

    // Chama a função para adicionar a estação ao array
    onAddStation(newStation);

    // Limpa o formulário após a submissão
    setFormData({
      id_estacao: 0, // Usando timestamp como ID único (melhor opção se você não tem um ID único gerado pelo servidor)
      nome_estacao: "",
      CoordenadasN: "",
      CoordenadasS: "",
      numero_linha: 0,
    });

    //console.log("Estação adicionada:", newStation);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddStation();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatLineString = (line: number | null) => {
    if (line === 0 || line === null) return "Linhas...";
    return `BRT ${line}`;
  };

  return (
    <div className="absolute top-[calc(3rem+6rem)] bg-neutral-900 w-full h-[calc(100dvh-6rem-3rem)] bg-opacity-55 flex justify-center">
      <div className="relative border-4 border-neutral-700 w-[20%] min-w-fit h-fit flex flex-col items-start mt-40 bg-neutral-900 rounded-lg font-overpass">
        <X
          className="absolute right-2 top-2 cursor-pointer"
          onClick={props.onClick}
        />
        <h2 className="py-6 font-semibold font-mono text-lg self-center">
          Adiconar Estacao
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="px-5 flex flex-col gap-5 w-full">
            <label className="flex flex-col text-neutral-400 text-sm font-semibold">
              Rua
              <input
                type="text"
                name="nome_estacao"
                onChange={handleInputChange}
                value={formData.nome_estacao}
                className="w-[15dvw] border-2 border-[#424242] bg-transparent rounded focus:outline-none focus:border-neutral-400 px-2"
              />
            </label>
            <label className="flex flex-col text-neutral-400 text-sm font-semibold gap-1">
              BRT
              <Selector
                placeholder="Linhas..."
                value={formatLineString(formData.numero_linha)}
                onChange={handleOptionClick}
              >
                <Option onClick={() => handleOptionClick("BRT 1")}>BRT 1</Option>
                <Option onClick={() => handleOptionClick("BRT 2")}>BRT 2</Option>
                <Option onClick={() => handleOptionClick("BRT 3")}>BRT 3</Option>
              </Selector>
            </label>
            <label className="flex text-neutral-400 text-sm font-semibold justify-evenly items-center gap-8 max-w-fit">
              Coordenadas
              <input
                type="text"
                name="CoordenadasN"
                placeholder="Latitude"
                onChange={handleInputChange}
                value={formData.CoordenadasN}
                className="pt-1 w-[5dvw] border-2 border-[#424242] bg-transparent rounded focus:outline-none focus:border-neutral-400 px-2 "
              />
              <input
                type="text"
                name="CoordenadasS"
                placeholder="Longitude"
                onChange={handleInputChange}
                value={formData.CoordenadasS}
                className="w-[5dvw] pt-1 border-2 border-[#424242] bg-transparent rounded focus:outline-none focus:border-neutral-400 px-2 "
              />
            </label>
            <div className="flex w-full justify-end items-center py-5 ">
              {/* <input className=" border-2 px-2 rounded border-neutral-600 font-bold text-xl hover:scale-105"
                            type="submit" value="+" /> */}
              <button
                type="submit"
                className="flex items-center font-poppins text-sm font-bold tracking-wider gap-1 border-2 border-neutral-700 rounded-lg 
                            transition-all duration-200 hover:scale-110 hover:animate-spin hover:text-blue-500 px-2 py-1"
              >
                Adicionar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
