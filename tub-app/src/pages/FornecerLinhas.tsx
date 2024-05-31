
import { Linhas } from "../components/Linhas";
import { Navbar } from "../components/Navbar";





/* 
    Falta ligar a base de dados
*/

export function FornecerLinhas(){

    return(
        <div className="h-full">
            <Navbar page={1}/>
            <div className='bg-[#171717] min-h-[calc(100dvh-6rem)]'>
                <div className='flex flex-col justify-evenly py-20 bg-[#171717] 2xl:mx-96 xl:mx-60 lg:mx-36 md:mx-36 h-fit min-h-[calc(100dvh-6rem)]'>
                    <Linhas linha='BRT 1' origem='E. Leclerc' destino='Este' ocupacao={10} chegada='15:35'/>
                    <Linhas linha='BRT 2' origem='Estação CP' destino='Hospital de Braga' ocupacao={40} chegada='15:32'/>
                    <Linhas linha='BRT 3' origem='Estação CP' destino='Avenida Robert Smith' ocupacao={25} chegada='15:40'/>
                    <Linhas linha='BRT 4' origem='Praça Conde de Agrolongo' destino='Nova Arcada' ocupacao={17} chegada='15:30'/>
                </div>
            </div>
        </div>
    );
}