import { BACKEND_API } from '@/service/config'
import { Reissue } from '@/service/model'
import { useAuthStore } from '@/store/auth'

export const reissueApi = async () => {
  const { setAccessToken } = useAuthStore.getState()

  const reissueClient = new Reissue(BACKEND_API)
  const response = await reissueClient.reissue()

  const newAccessToken = response.headers['authorization']
  setAccessToken(newAccessToken)

  return newAccessToken
}
