
interface props {
    children: React.ReactNode;
    icon?: React.ReactElement;
    onClick: (newPlaceholder: string) => void;
}

export function Option(props:props){


    const handleClick = () => {
        props.onClick(props.children as string);
    };

    return (
        <div className="flex justify-start items-center max-w-52 mx-1 my-1 px-2 py-1 rounded-sm bg-neutral-600 font-poppins text-sm font-medium hover:cursor-pointer" onClick={handleClick}>
            {props?.icon}
            {props.children}
        </div>
    );
}