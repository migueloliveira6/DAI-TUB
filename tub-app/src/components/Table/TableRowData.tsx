import { useState } from "react";
import { TableRow } from "./TableRow";
import { SquarePlusIcon, SquareMinusIcon } from "lucide-react";

interface props {
  estacao: string;
  linha: string;
  pagina: number;
  index: number;
  isSelected: boolean;
  onSelectId: (index: number, linha: string) => void;
}

let ids: { index: number; linha: string }[] = [];

export function TableRowData(props: props) {
  const [iconType, setIconType] = useState(false);

  // const handleClick = () => {
  //     if (ids.some(item => item.index === props.index && item.linha === props.linha )) {
  //       ids = ids.filter(item => !(item.index === props.index && item.linha === props.linha));

  //       console.log("Removed:", props.index, props.linha , ids);
  //     } else {
  //       ids.push({ index: props.index, linha: props.linha });
  //       console.log("Added:", props.index, ids);
  //     }
  //     setIconType(prev => !prev);
  //   };

  const handleClick = () => {
    props.onSelectId(props.index, props.linha);
    setIconType((prev) => !prev);
  };

  return (
    <TableRow
      className={` h-10 border-b border-[#3a3a3a] ${
        props.isSelected ? "bg-blue-500 bg-opacity-30"
          : ""
      }`}
    >
      <td className="max-w-[10dvw]">{props.estacao}</td>
      <td>{props.linha}</td>
      <td className="flex justify-center">
      {props.isSelected ? (
          <SquareMinusIcon
            className="w-5 cursor-pointer"
            onClick={handleClick}
          />
        ) : (
          <SquarePlusIcon
            className="w-5 cursor-pointer"
            onClick={handleClick}
          />
        )}
      </td>
    </TableRow>
  );
}
