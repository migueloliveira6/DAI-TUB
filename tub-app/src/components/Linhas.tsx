import {ArrowDownIcon,Circle} from 'lucide-react';
import {Clock1,Clock2,Clock3,Clock4,Clock5,Clock6} from 'lucide-react';
import { Ocupacao } from '../utils/Ocupacao';

interface props{
    linha:string,
    origem:string,
    destino:string,
    ocupacao:number,
    chegada:string,
}

function getTime(horas:number){
    switch(horas){
        case 1:
        case 13:
            return <Clock1 className='size-5'/>;
        case 2:
        case 14:
            return <Clock2 className='size-5'/>;
        case 3:
        case 15:
            return <Clock3 className='size-5'/>;
        case 4:
        case 16:
            return <Clock4 className='size-5'/>;
        case 5:
        case 17:
            return <Clock5 className='size-5'/>;
        case 6:
        case 18:
            return <Clock6 className='size-5'/>;
    }
}


export function Linhas(props:props){

    

    return(
        <div className="flex flex-col py-9 text-white mx-6 border-b-2 border-[#454545] border-dotted ">
            <div className='flex justify-between font-overpass font-medium -right-11 text-xl px-2 py-2'>
                <h2 className='text-sky-500 text-[1.35rem] font-semibold'>
                    Linha {props.linha}
                </h2>
                <div className='flex flex-col items-center'>
                    <h2 className='flex gap-2 items-center font-overpass font-semibold text-xl '>
                        Chegada
                        {getTime(parseInt(props.chegada.slice(0,3)))}
                    </h2>
                    <div className='font-overpass text-base'>
                        {props.chegada}
                    </div>
                </div>
            </div>
            <div className='font-overpass flex flex-col justify-between items-center relative'>
                <div className='flex items-center w-[30dvw] justify-between'>
                    <div className='flex flex-col text-center max-w-44 w-44'>
                        <h2 className='font-overpass font-semibold text-lg text-blue-400'>
                            Origem:
                        </h2>
                        <div className='font-poppins'>
                            {props.origem}
                        </div>
                    </div>
                    <ArrowDownIcon className='absolute -rotate-90 mt-5 size-5 left-[50%]'/>
                    <div className='flex flex-col items-center max-w-44 w-44'>
                        <h2 className=' font-overpass font-semibold text-lg text-blue-400'>
                            Destino:
                        </h2>
                        <div className=''>
                            {props.destino}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-fit justify-center items-center gap-2'>
                <div className='flex flex-col w-fit justify-center items-center'>
                    <h2 className='font-overpass font-semibold'>
                        Ocupantes
                    </h2>
                    <div className='font-overpass font-medium '>
                        {props.ocupacao}/50
                    </div>
                </div>
                <Circle className={`size-5 ${Ocupacao(props.ocupacao)}`}/>
            </div>
        </div>
    );

}