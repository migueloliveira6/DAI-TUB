import { useEffect, useState } from "react";
import { Table } from "../../components/Table/Table";
import { TableCol } from "../../components/Table/TableCol";
import { TableRowData } from "../../components/Table/TableRowData";
import { PointerIcon, PlusIcon, WrenchIcon, MinusIcon } from "lucide-react";
import { Option } from "../../components/Selector/Option";
import { Selector } from "../../components/Selector/Selector";
import { Button } from "../../components/Button";
import { Popup } from "../../components/Popup/Popup";
import {
  fetchAllStations,
  addNewStation,
  removeStation,
  fetchStationByLine,
} from "../../services/EstacoesManagement";

interface Station {
  id_estacao: number;
  nome_estacao: string;
  CoordenadasN: string;
  CoordenadasS: string;
  numero_linha: number;
}


export function Estacoes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlaceholder, setSelectedPlaceholder] = useState("Todas");
  const [canPop, setCanPop] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedIds, setSelectedIds] = useState<
    { index: number; linha: string }[]
  >([]);


  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      let stations = await fetchAllStations();
      stations = stations.sort((a, b) => a.numero_linha - b.numero_linha);
      setStations(stations);
    } catch (error: any) {
      console.error("Erro ao buscar estações:", error.message);
    }
    //console.log(stations);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOptionClick = (newPlaceholder: string) => {
    setSelectedPlaceholder(newPlaceholder);
  };

  const handlePopup = () => {
    setCanPop(!canPop);
  };

  const handleAddStation = async (station: Station) => {
    try {
      console.log(station)
      await addNewStation(station);
      fetchStations(); // Atualiza a lista de estações após adicionar
      setCanPop(false); // Fecha o popup após adicionar a estação
    } catch (error: any) {
      console.error("Erro ao adicionar estação:", error.message);
    }
  };

  const handleDeleteSelectedStations = async () => {
    try {
      for (const { index } of selectedIds) {
        await removeStation(index);
      }
      fetchStations(); // Atualiza a lista de estações após remover
      setSelectedIds([]); // Limpa os IDs marcados após exclusão
    } catch (error: any) {
      console.error("Erro ao remover estação:", error.message);
    }
  };

  const handleSelectId = (index: number, linha: string) => {
    console.log(index,linha)
    //const formattedLinha = `BRT ${linha}`;

    const existingIndex = selectedIds.findIndex(
      (item) => item.index === index && item.linha === linha
    );

    if (existingIndex !== -1) {
      setSelectedIds((prevIds) => {
        const newIds = [...prevIds];
        newIds.splice(existingIndex, 1);
        return newIds;
      });
    } else {
      setSelectedIds((prevIds) => [
        ...prevIds,
        { index, linha },
      ]);
    }
    
  };
  console.log(selectedIds)
  // Quantidade de linhas por página
  const itemsPerPage = 10;

  // Calculando índices de início e fim
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = stations
    .filter((station) => {
      if (selectedPlaceholder === "Todas") {
        return true;
      } else {
        const linhaString = `BRT ${station.numero_linha}`;
        console.log(linhaString, selectedPlaceholder);
        return linhaString === selectedPlaceholder;
      }
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  //console.log(stations);

  // Calculando total de páginas
  const totalPages = Math.ceil(
    stations.filter((station) => {
      if (selectedPlaceholder === "Todas") {
        return true;
      } else {
        const linhaString = `BRT ${station.numero_linha}`;
        return linhaString === selectedPlaceholder;
      }
    }).length / itemsPerPage
  );

  return (
    <div className="h-[calc(100dvh-3rem-6rem)] max-h-full bg-[#2f2f2f] select-none">
      <div className="flex justify-between px-36 pt-12">
        <div className="flex flex-col items-center text-white font-normal text-lg w-full max-w-fit max-h-fit">
          <h2 className="tracking-wider text-4xl pb-10 flex justify-center items-baseline gap-2">
            <WrenchIcon className="w-7" />
            Gerir Estacoes
          </h2>
          <div className="flex items-center justify-end gap-10 w-full px-[4.5rem] ">
            <Selector
              placeholder="Linhas..."
              value={selectedPlaceholder}
              onChange={handleOptionClick}
            >
              <Option onClick={handleOptionClick}>Todas</Option>
              <Option onClick={handleOptionClick}>BRT 1</Option>
              <Option onClick={handleOptionClick}>BRT 2</Option>
              <Option onClick={handleOptionClick}>BRT 3</Option>
              <Option onClick={handleOptionClick}>BRT 4</Option>
            </Selector>
            <input
              className="font-poppins text-sm w-60 h-8 px-2 border-2 border-neutral-700 bg-neutral-800 text-white rounded-lg focus:outline-none"
              placeholder="Digite o nome da Estacao"
            />

            <Button
              className="flex justify-center items-center bg-transparent w-fit gap-1 border border-none hover:border"
              icon={<PlusIcon className="w-5" />}
              text="Adicionar"
              onClick={handlePopup}
            />
            <Button
              className="flex justify-center items-center bg-transparent w-fit gap-1 border border-none hover:border"
              icon={<MinusIcon className="w-5" />}
              text="Remover"
              onClick={handleDeleteSelectedStations}
            />
          </div>
          {canPop === true ? (
            <Popup
              onClick={handlePopup}
              onAddStation={handleAddStation}
              stations={stations}
            />
          ) : null}
          <Table
            className="max-w-[77dvw] w-[77dvw] mt-5"
            onPageChange={onPageChange}
            totalOfPages={totalPages}
          >
            <thead className="text-center font-medium font-poppins text-sm border-y-2 border-neutral-800 text-blue-600 bg-[#2b2b2b] uppercase">
              <TableCol>Estacao</TableCol>
              <TableCol>Linha</TableCol>
              <TableCol className="flex justify-center">
                <PointerIcon className="w-5" />
              </TableCol>
            </thead>
            <tbody className="text-center font-overpass-mono text-base font-normal text-white ">
              {currentItems.map((item, index) => (
                <TableRowData
                  key={index}
                  estacao={item.nome_estacao}
                  linha={`BRT ${item.numero_linha}`} // Formate a linha aqui
                  pagina={currentPage} 
                  index={item.id_estacao}
                  isSelected={selectedIds.some(
                    (selected) =>
                      selected.index === item.id_estacao &&
                      selected.linha === `BRT ${item.numero_linha}` // Formate também aqui
                  )}
                  onSelectId={handleSelectId}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
