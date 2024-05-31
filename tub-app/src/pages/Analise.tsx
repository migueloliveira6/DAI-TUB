import { Navbar } from "../components/Navbar";
import { useState } from 'react';
import { List } from "../components/Analise/List";
import { SearchBar } from "../components/Analise/Searchbar";

interface Analise {
    ocupacao: number;
    bilhetes: number;
    data: string;
    matricula: string;
}

const initialData: Analise[] = [
    { ocupacao: 75, bilhetes: 120, data: '01-05-2024', matricula: 'AX00AZ' },
    { ocupacao: 60, bilhetes: 100, data: '02-05-2024', matricula: '16LP08' },
    { ocupacao: 90, bilhetes: 150, data: '03-05-2024', matricula: 'VO3710' },
];

export function Analise(){
    const [data, setData] = useState<Analise[]>(initialData);
    const [filteredData, setFilteredData] = useState<Analise[]>(initialData);

    const handleSearch = (searchTerm: string) => {
        const filtered = data.filter(item =>
            item.data.includes(searchTerm) ||
            item.ocupacao.toString().includes(searchTerm) ||
            item.bilhetes.toString().includes(searchTerm) ||
            item.matricula.toString().includes(searchTerm)
        );
        setFilteredData(filtered);
    };


    return(
        <div className="h-full">
            <Navbar page={4}/>
            <div className="bg-[#171717] min-h-[calc(100dvh-6rem)]">
                <SearchBar onSearch={handleSearch} />
                <List info={filteredData} />
            </div>
        </div>
    );
}