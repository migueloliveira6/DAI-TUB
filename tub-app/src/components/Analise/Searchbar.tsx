import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

export function SearchBar(props:SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        props.onSearch(e.target.value);
    };

    return (
        <div className="mb-4">
            <input 
                type="text" 
                value={searchTerm}
                onChange={handleChange}
                placeholder="Procurar..." 
                className="w-full p-1.5 rounded-lg border-2 border-sky-400 bg-gray-50 text-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
        </div>
    );
};

