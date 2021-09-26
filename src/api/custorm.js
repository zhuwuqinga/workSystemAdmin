import axios from '@/libs/api.request'

export const getCustormList = (data) => {
  return axios.request({
    url: '/system/company/list',
    method: 'POST',
    data: data
  })
}

export const addCustorm = (data) => {
  return axios.request({
    url: '/system/company/add',
    method: 'POST',
    data: data,
    dataType: 'JSON'
  })
}

export const editCustorm = (data) => {
  return axios.request({
    url: '/system/company/edit',
    method: 'POST',
    data: data,
    dataType: 'JSON'
  })
}

export const removeCustorm = (data) => {
  return axios.request({
    url: '/system/company/remove',
    method: 'POST',
    data: data,
    dataType: 'JSON'
  })
}

export const getSocialRuleList = (data) => {
  return axios.request({
    url: '/system/company/getSocialRuleList',
    method: 'POST',
    data: data,
    dataType: 'JSON'
  })
}

export const getPublicFundRuleList = (data) => {
  return axios.request({
    url: '/system/company/getPublicFundRuleList',
    method: 'POST',
    data: data,
    dataType: 'JSON'
  })
}
