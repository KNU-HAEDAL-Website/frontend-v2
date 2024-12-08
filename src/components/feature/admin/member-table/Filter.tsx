'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Input } from '@/components/ui'

interface TableFilterProps<T> {
  table: Table<T>
}

export function MemberTableFilter<T>({ table }: TableFilterProps<T>) {
  return (
    <div className="flex items-center justify-end space-x-2 py-1">
      <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="이름으로 검색하기"
        value={(table.getColumn('userName')?.getFilterValue() as string) ?? ''}
        onChange={(e) =>
          table.getColumn('userName')?.setFilterValue(e.target.value)
        }
        className="h-7 w-40 bg-secondary/40 focus-visible:bg-secondary/70 focus-visible:ring-transparent"
      />
    </div>
  )
}
