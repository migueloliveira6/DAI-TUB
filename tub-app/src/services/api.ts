interface Station {
  id_estacao: number;
  nome_estacao: string;
  CoordenadasN: string;
  CoordenadasS: string;
  numero_linha: number;
}

interface Autocarro{
  matricula:string,
  marca:string,
  modelo:string,
  ano_de_fabrico:number,
  lugares:number,
  numero_linha:number,
}

const url = "http://localhost:3000";

export async function getStations() {
  // Implementação para buscar todas as estações
  return fetch(`${url}/api/estacoes/get-estacoes`).then((response) =>
    response.json()
  );
}
export async function getStationsByLine(linha: number) {
  // Implementação para buscar todas as estações
  return fetch(`${url}/api/estacoes/get-estacoes?numero_linha=${linha}`).then(
    (response) => response.json()
  );
}

export async function addStation(newStation: Station) {
  try {
    const response = await fetch(`${url}/api/estacoes/post-estacao`, {
      method: "POST",
      body: JSON.stringify(newStation),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Erro ao adicionar estação:", error.message);
    throw error;
  }
}

export async function deleteStation(stationId: number) {
  // Implementação para deletar uma estação pelo ID
  return fetch(`${url}/api/estacoes/delete-estacoes?id_estacao=${stationId}`, {
    method: "DELETE",
  });
}


export async function getAutocarro(matricula?:string,numero_linha?:string){
  
  if(matricula){
    return fetch(`${url}/api/autocarros/get-autocarros?matricula=${matricula}`).then(
      (response) => response.json()
    );
  }
  if(numero_linha){
    return fetch(`${url}/api/autocarros/get-autocarros?numero_linha=${numero_linha}`).then(
      (response) => response.json()
    );
  }

  return fetch(`${url}/api/autocarros/get-autocarros`).then(
        (response) => response.json()
    );

}

export async function addAutocarro(autocarro: Autocarro){
  console.log()
  try {
    const response = await fetch(`${url}/api/autocarros/post-autocarro`, {
      method: "POST",
      body: JSON.stringify(autocarro),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Erro ao adicionar autocarro:", error.message);
    throw error;
  }
}

export async function deleteAutocarro(matricula: string) {
  // Implementação para deletar uma estação pelo ID
    return fetch(`${url}/api/autocarros/delete-autocarro?matricula=${matricula}`, {
      method: "DELETE",
    });
}