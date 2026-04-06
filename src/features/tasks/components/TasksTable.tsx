import { flexRender, getCoreRowModel, useReactTable, type CellContext } from "@tanstack/react-table";
import type { Task } from "../interfaces/task.interface";
import { useAppDispatch } from "../../../store/hooks";
import { deleteTask, openModal } from "../states/task.slice";
interface Props {
    data: Task[]
}
export const TasksTable = ({ data }:Props) => {
    const dispatch = useAppDispatch();
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
        {
            header: 'acciones',
            cell: (info: CellContext<Task, any>) => (
                <div className="actions">
                    <button 
                        onClick={() => dispatch(openModal(info.row.original))}
                        className="modifiedAction"
                    >
                        Editar
                    </button>
                    <button 
                        onClick={() => dispatch(deleteTask({id: info.row.original.id}))}
                        className="deletedAction"
                    >
                        Eliminar
                    </button>
                </div>
            ),
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
