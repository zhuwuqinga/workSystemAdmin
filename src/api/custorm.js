import axios from '@/libs/api.request'

// 加载客户列表
export const getCustormList = (data) => {
  return axios.request({
    url: '/system/company/list',
    method: 'POST',
    data: data
  })
}

// 新增客户
export const addCustorm = (data) => {
  return axios.request({
    url: '/system/company/add',
    method: 'POST',
    data: data,
    dataType: 'JSON'
  })
}

// 修改客户
export const editCustorm = (data) => {
  return axios.request({
    url: '/system/company/edit',
    method: 'POST',
    data: data,
    dataType: 'JSON'
  })
}

// 删除客户
export const removeCustorm = (data) => {
  return axios.request({
    url: '/system/company/remove',
    method: 'POST',
    data: data,
    dataType: 'JSON'
  })
}

// 社保规列表
export const getSocialRuleList = (data) => {
  return axios.request({
    url: '/system/company/getSocialRuleList',
    method: 'POST',
    data: data,
    dataType: 'JSON'
  })
}

// 公积金列表
export const getPublicFundRuleList = (data) => {
  return axios.request({
    url: '/system/company/getPublicFundRuleList',
    method: 'POST',
    data: data,
    dataType: 'JSON'
  })
}

// 行业列表
export const getStationList = () => {
  return axios.request({
    url: '/order/stationTemp/list',
    method: 'POST'
  })
}

// 销售列表
export const getSaleManList = (data) => {
  return axios.request({
    url: '/system/admin/saleList',
    method: 'POST',
    data: data,
    dataType: 'JSON'
  })
}
