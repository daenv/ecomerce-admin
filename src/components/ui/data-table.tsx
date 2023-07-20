'use client';
import {
   ColumnDef,
   ColumnFiltersState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   useReactTable,
} from '@tanstack/react-table';
import { Input } from './input';
import { Table, TableHead, TableHeader, TableRow } from './table';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   searchKey: string;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   searchKey,
}: DataTableProps<TData, TValue>) {
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      state: {
         columnFilters,
      },
   });
   return (
      <div>
         <div className="flex items-center py-4">
            <Input
               placeholder="Search.."
               className="max-w-sm"
               value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
               onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
            />
         </div>
         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext(),
                                      )}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
            </Table>
         </div>
      </div>
   );
}
