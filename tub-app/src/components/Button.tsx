import React from "react";



interface ButtonProps {
  icon?: React.ReactElement;
  text?: string;
  page?: string; // Adicionando a prop page
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      className={`border-2 border-neutral-800 bg-neutral-900 text-white w-fit h-fit px-2 py-1 rounded font-poppins font-medium text-sm ${props.className}
      hover:cursor-pointer hover:border-neutral-600 hover:bg-neutral-800 transition-all duration-200`}
      onClick={props.onClick}
    >
      {props.icon}
      {props.text}
    </button>
  );
}