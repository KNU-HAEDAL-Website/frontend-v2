import * as React from 'react'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'

import { Button, ButtonProps, buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Link>

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'activeLink' : 'link',
      }),
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

type PaginationButtonProps = {
  isActive?: boolean
  disabled?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

const PaginationButton = ({
  className,
  isActive,
  ...props
}: PaginationButtonProps) => (
  <Button
    aria-current={isActive ? 'page' : undefined}
    variant={isActive ? 'outline' : 'ghost'}
    className={cn('h-8 w-8 p-0 text-sm', className)}
    {...props}
  />
)
PaginationButton.displayName = 'PaginationButton'

const PaginationPrevious = ({
  className,
  disabled = false,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn(
      'p-3 text-muted-foreground hover:text-primary',
      disabled && 'pointer-events-none text-primary/40',
      className,
    )}
    {...props}
  >
    <ChevronLeftIcon className="h-5 w-5" />
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  disabled = false,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn(
      'p-3 text-muted-foreground hover:text-primary',
      disabled && 'pointer-events-none text-primary/40',
      className,
    )}
    {...props}
  >
    <ChevronRightIcon className="h-5 w-5" />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationButton,
}
