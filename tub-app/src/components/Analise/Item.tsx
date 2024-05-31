import React from 'react';

interface AnaliseProps {
    ocupacao: number;
    bilhetes: number;
    data: string;
    matricula: string;
}

export function ItemAnalise(props:AnaliseProps) {
    return (
        <div className="bg-sky-400 p-4 rounded-lg shadow-md mb-4 text-white">
            <p>Ocupação Média do Autocarro: {props.ocupacao}%</p>
            <p>Número de Bilhetes Validados: {props.bilhetes}</p>
            <p>Data: {props.data}</p>
            <p>Matrícula: {props.matricula}</p>
        </div>
    );
};

export default ItemAnalise;
