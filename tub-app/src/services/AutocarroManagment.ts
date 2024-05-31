import {addAutocarro, deleteAutocarro, getAutocarro} from './api'

interface Autocarro{
    matricula:string,
    marca:string,
    modelo:string,
    ano_de_fabrico:number,
    lugares:number,
    numero_linha:number,
  }

export async function fetchAutocarros(): Promise<Autocarro[]> {
    try {
        const autocarros = await getAutocarro();
        return autocarros;
      } catch (error:any) {
        console.error("Erro ao buscar autocarro:", error.message);
        throw error;
      }
}
export async function postAutocarro(autocarro:Autocarro) {
    try {
        await addAutocarro(autocarro);
      } catch (error:any) {
        console.error("Erro ao adicionar estação:", error.message);
        throw error;
      }
}

export async function removeAutocarro(matricula: string): Promise<void> {
  try {
    await deleteAutocarro(matricula);
  } catch (error:any) {
    console.error("Erro ao remover estação:", error.message);
    throw error;
  }
}  