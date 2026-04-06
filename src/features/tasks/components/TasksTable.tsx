import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import type { Task } from "../interfaces/task.interface";
interface Props {
    data: Task[]
}
export const TasksTable = ({ data }:Props) => {
    const columns = [
        {
            header: 'Id',
            accessorKey: 'id'
        },
        {
            header: 'Fecha de creación',
            accessorKey: 'created_at'
        },
        {
            header: 'Titulo',
            accessorKey: 'title'
        },
        {
            header: 'Descripción',
            accessorKey: 'description'
        },
        {
            header: 'Completada',
            accessorKey: 'completed'
        },
    ];

    const table =useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });
    return (
        <table>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell ,//?? cell.column.columnDef.,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
