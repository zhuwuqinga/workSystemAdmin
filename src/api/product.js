import axios from '@/libs/api.request'

// 加载协议列表
export const getProductList = (data) => {
  return axios.request({
    url: '/system/product/list',
    method: 'POST',
    data: data
  })
}

// 自动生成产品编号
export const createNO = (params) => {
  return axios.request({
    url: '/system/product/createNO',
    method: 'GET',
    params: params
  })
}
