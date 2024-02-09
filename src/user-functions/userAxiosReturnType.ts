import { AxiosResponse, AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios"

export interface UserAxiosReturnType {
  axiosResponse:AxiosResponse<any, any>|null,
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders|null
  status:number,
  statusText:string | null,
  isSuccess: boolean
  message: string|null
  errorObject:any|null

}
