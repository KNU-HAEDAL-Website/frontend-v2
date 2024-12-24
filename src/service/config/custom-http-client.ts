import { AxiosInstance } from 'axios'

import { HttpClient } from '@/lib/http-client'

export class CustomHttpClient<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  constructor(instance: AxiosInstance) {
    super({ instance })
  }
}
