interface Station {
    id_estacao: number;
    nome_estacao: string;
    CoordenadasN: string;
    CoordenadasS: string;
    numero_linha: number;
}

import { addStation, deleteStation, getStations, getStationsByLine } from "./api";

export async function fetchAllStations(): Promise<Station[]> {
    try {
      const stations = await getStations();
      return stations;
    } catch (error:any) {
      console.error("Erro ao buscar estações:", error.message);
      throw error;
    }
  }
export async function fetchStationByLine(linha:number): Promise<Station[]> {
    try {
      const stations = await getStationsByLine(linha);
      return stations;
    } catch (error:any) {
      console.error("Erro ao buscar estações:", error.message);
      throw error;
    }
  }
  
  export async function addNewStation(station: Station){
    try {
      await addStation(station);
    } catch (error:any) {
      console.error("Erro ao adicionar estação:", error.message);
      throw error;
    }
  }
  
  export async function removeStation(id: number): Promise<void> {
    try {
      await deleteStation(id);
    } catch (error:any) {
      console.error("Erro ao remover estação:", error.message);
      throw error;
    }
  }  