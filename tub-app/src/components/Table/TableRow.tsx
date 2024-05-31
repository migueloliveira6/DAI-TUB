interface TableRowProps {
    children: React.ReactNode;
    className?:string;
}

export function TableRow(props: TableRowProps) {
    return (
        <tr className={`${props.className}`}>
            {props.children}
        </tr>
        );
}