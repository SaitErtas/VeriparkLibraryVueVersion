import type { AxiosRequestHeaders } from 'axios'
import auth from './auth'

export const UserAxiosHeader = () => {
  const authorization = window.localStorage.getItem(auth.storageTokenKeyName)
  const _acceptLanguge = window.localStorage.getItem('Accept-Language')

  return {
    Authorization: authorization,
  } as unknown as AxiosRequestHeaders
}
