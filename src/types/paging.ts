export type PageInfo = {
  totalPages: number
  totalElements: number
  pageSize: number
}

export type Paging = {
  nextPageToken?: string
  pageInfo: PageInfo
}
