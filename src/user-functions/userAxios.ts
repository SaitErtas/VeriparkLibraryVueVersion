import auth from '@/configs/auth'
import { UserAxiosHeader } from '@/configs/userAxiosHeader'
import axios from '@axios'
// eslint-disable-next-line import/order
import type { AxiosResponse } from 'axios'

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
}): Promise<AxiosResponse<any, any> | null> {
  try {
    return await axios.post(auth.apiRootUrl + method, data, {
      headers: UserAxiosHeader(),
    })
  }
  catch (err) {
    const error = err as any
    if (error.response) {
      console.log('error1: ', error)
      if (error.response.data?.Errors) {
        await console.log(`${error.response.data.Errors} ${error.message}`)
      }
      else {
        await console.log(`${error.response.data} ${error.message}`, {
          duration: 5000,
        })
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
