import axios, { AxiosRequestConfig } from 'axios'
import { appConfig } from '../config/appConfig'
import { getLocalStorageItem } from '../utils/appUtils'



export const postApi = async ({
  url = '',
  body,
  authToken = true,
}) => {
  const userData = getLocalStorageItem('user')
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (authToken) {
    config.headers = {
      Authorization: `Bearer ${userData?.token}`,
    }
  }
  const response = await axios.post(`${appConfig.apiUrl}/${url}`, body, config)
  console.log(response,"response");

  return response?.data
}

export const getApi = async (url, authToken) => {
  const userData = getLocalStorageItem('user')

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (authToken) {
    config.headers = {
      Authorization: `Bearer ${userData?.token}`,
    }
  }
  const response = await axios.get(`${appConfig.apiUrl}/${url}`, config)

  return response?.data
}
