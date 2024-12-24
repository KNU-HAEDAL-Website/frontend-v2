import { AxiosError } from 'axios'

import { reissueApi } from '../api'
import { AUTHORIZATION_API } from './instance'

let isRefreshing = false
let failedQueue: {
  resolve: (token: string | null) => void
  reject: (error: Error) => void
}[] = []

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const authErrorInterceptor = async (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status
    const originalRequest = error.config

    if (status === 401 && originalRequest) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })

        if (!isRefreshing) {
          isRefreshing = true

          reissueApi()
            .then((newAccessToken) => {
              processQueue(null, newAccessToken)
            })
            .catch((reissueError) => {
              processQueue(reissueError, null)
            })
            .finally(() => {
              isRefreshing = false
            })
        }
      })
        .then((token) => {
          if (token && originalRequest) {
            originalRequest.headers['Authorization'] = `${token}`
            return AUTHORIZATION_API(originalRequest)
          }
        })
        .catch((queueError) => {
          return Promise.reject(queueError)
        })
    }
  }

  return Promise.reject(error)
}

export default authErrorInterceptor
