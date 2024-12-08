import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui'

export type NavLink = {
  index?: number
  link: string
  name: string
}

type PageBreadcrumbProps = {
  navLinks: NavLink[]
  pageName?: string
}

export const PageBreadcrumb = ({ navLinks, pageName }: PageBreadcrumbProps) => {
  return (
    <Breadcrumb className="my-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {navLinks.map((navLink) => (
          <Fragment key={navLink.index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={navLink.link}>
                {navLink.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
        {pageName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
