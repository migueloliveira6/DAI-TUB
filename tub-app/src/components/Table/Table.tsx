import React, { useState } from 'react';
import {ArrowLeftSquareIcon, ArrowRightSquareIcon} from 'lucide-react'


interface TableProps {
    children: React.ReactNode;
    className?:string;
    onPageChange: (page: number) => void;
    totalOfPages:number;
}

export function Table(props: TableProps) {

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > props.totalOfPages) {
            return; 
        }
        setCurrentPage(page);
        props.onPageChange(page); 
    };


    return (
        <div className="border-neutral-800 mx-10 overflow-hidden">
            <table className={`min-w-full ${props.className}`}>
                {props.children}
            </table>
            <div className='flex text-sm font-poppins font-normal justify-end items-center px-2 py-2 gap-3'>
                <ArrowLeftSquareIcon
                    className={`w-5 mx-1 cursor-pointer transition-all duration-75 ease-linear hover:text-blue-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                />
                {[...Array(props.totalOfPages)].map((_, index) => (
                    <p
                        key={index}
                        className={`cursor-pointer ${currentPage === index + 1 ? 'text-blue-500 font-bold' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </p>
                ))}
                <ArrowRightSquareIcon
                    className={`w-5 mx-1 cursor-pointer transition-all duration-75 ease-linear hover:text-blue-500 ${currentPage === props.totalOfPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                />
            </div>
        </div>
    );
}