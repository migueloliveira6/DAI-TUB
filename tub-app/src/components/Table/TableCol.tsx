interface TableColProps {
    children: React.ReactNode;
    className?:string;
}

export function TableCol(props: TableColProps) {
    return (
        <th className={`${props.className}`}>
            {props.children}
        </th>
    );
}