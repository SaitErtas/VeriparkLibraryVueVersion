import auth from '@/configs/auth'
import { UserAxiosHeader } from '@/configs/userAxiosHeader'
import axios from '@axios'
// eslint-disable-next-line import/order
import type { AxiosResponse } from 'axios'
import { UserAxiosReturnType } from './userAxiosReturnType'

async function put({
  method,
  data,
}: {
  method: string
  data: never
}): Promise<AxiosResponse<unknown, unknown> | null | string> {
  try {
    return await axios.put(auth.apiRootUrl + method, data, {
      headers: UserAxiosHeader(),
    })
  }
  catch (err) {
    const error = err as any
    if (error?.response) {
      console.log('error1: ', error)
      if (error.response.data?.Errors)
        console.log(`${error.response.data.Errors} ${error.message}`)
      else console.log(`${error.response.data} ${error.message}`)
    }
    else if (error.request) {
      console.log('error2: ', error)
    }
    else {
      console.log('error3: ', error)
    }
  }

  return null
}

async function post({
  method,
  data,
}: {
  method: string
  data: any
}): Promise<UserAxiosReturnType> {
  try {
    const result = await axios.post(auth.apiRootUrl + method, data, {
      headers: UserAxiosHeader(),
    })

    return { axiosResponse: result, status: result.status, isSuccess: true, headers: result.headers, message: result.statusText, statusText: result.statusText, errorObject: null }
  }
  catch (err) {
    const error = err as any
    if (error.response) {
      console.log('error1: ', error)

      if (error.response.data?.Errors) {
        console.log(`${error.response.data.Errors} ${error.message}`)
        return { axiosResponse: null, status: 99999, isSuccess: false, headers: null, message: `${error.response.data.Errors} ${error.message}`, statusText: null, errorObject: null }
      }
      else {
        console.log(`${error.response.data} ${error.message}`)
        return { axiosResponse: null, status: 99998, isSuccess: false, headers: null, message: `${error.response.data} ${error.message}`, statusText: null, errorObject: null }
      }
    }
    else if (error.request) {
      console.log('error2: ', error)
      return { axiosResponse: null, status: 99997, isSuccess: false, headers: null, message: null, statusText: null, errorObject: error }
    }
    else {
      console.log('error3: ', error)
      return { axiosResponse: null, status: 99996, isSuccess: false, headers: null, message: null, statusText: null, errorObject: error }
    }
  }


}

async function get({
  method,
}: {
  method: string
}): Promise<AxiosResponse<any, any> | null> {
  try {
    return await axios.get(auth.apiRootUrl + method, {
      headers: UserAxiosHeader(),
    })
  }
  catch (err) {
    const error = err as any
    if (error.response) {
      console.log('error1: ', error)
      if (error.response.data?.Errors) {
        console.log(`${error.response.data.Errors} ${error.message}`)
      }
      else if (`${error.response.data?.code}` === 'ERR_NETWORK') {
        console.log(`${error.response.data.Errors} ${error.message}`)

        return error
      }
      else {
        console.log(`${error.response.data} ${error.message}`)
      }
    }
    else if (error.request) {
      console.log('error2: ', error)
    }
    else {
      console.log('error3: ', error)
    }
  }

  return null
}

export default { put, post, get }
