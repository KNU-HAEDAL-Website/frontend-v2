import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 2000,
    ...config,
    headers: {
      Accept: 'application/json',
      ContentType: 'application/json',
      ...config.headers,
    },
  })

  return instance
}
