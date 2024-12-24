'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui'
import { Paging } from '@/types/paging'

type PaginationButtonsProps<T extends Paging> = {
  data: T
}

export const PaginationButtons = <T extends Paging>({
  data,
}: PaginationButtonsProps<T>) => {
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const currentPage = Number(searchParams.get('page')) || 1
  const pages = createPageNumber(data.pageInfo.totalPages, currentPage)

  const getPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())

    return `${pathName}?${params.toString()}`
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getPageURL(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <Link href={getPageURL(page)}>
              <PaginationButton isActive={currentPage === page}>
                {page}
              </PaginationButton>
            </Link>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={getPageURL(currentPage + 1)}
            disabled={currentPage === data.pageInfo.totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

const createPageNumber = (totalPages: number, currentPage: number) => {
  const endPage = Math.min(totalPages, currentPage + 2)

  const length = Math.min(5, totalPages)
  const adjustedStartPage = Math.max(1, endPage - 5 + 1)

  return Array.from({ length }, (_, index) => index + adjustedStartPage).filter(
    (page) => page <= totalPages,
  )
}
