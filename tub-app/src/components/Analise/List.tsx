import ItemAnalise from './Item';

interface Analise {
    ocupacao: number;
    bilhetes: number;
    data: string;
    matricula: string;
}

interface ListaAnaliseProps {
    info: Analise[];
}

export function List(props:ListaAnaliseProps) {
    return (
        <div>
            {props.info.map((item, index) => (
                <ItemAnalise 
                    key={index} 
                    ocupacao={item.ocupacao} 
                    bilhetes={item.bilhetes} 
                    data={item.data} 
                    matricula={item.matricula}
                />
            ))}
        </div>
    );
};
