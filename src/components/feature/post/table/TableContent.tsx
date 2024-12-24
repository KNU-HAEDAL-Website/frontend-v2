'use client'

import { HTMLAttributes } from 'react'

import { flexRender, Table as tanskTable } from '@tanstack/react-table'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { PostSummaryResponseDto } from '@/service/models'

interface PostTableContentProps extends HTMLAttributes<HTMLTableElement> {
  table: tanskTable<PostSummaryResponseDto>
}

export function PostTableContent({ table }: PostTableContentProps) {
  const pathName = usePathname()

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="text-center">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                <Link href={`${pathName}/posts/${row.getValue('postId')}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Link>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
