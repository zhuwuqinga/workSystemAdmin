import axios from '@/libs/api.request'

export const getCustormList = (data) => {
  return axios.request({
    url: '/system/company/list',
    method: 'POST',
    data: data
  })
}
