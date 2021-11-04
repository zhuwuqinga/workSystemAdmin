import axios from '@/libs/api.request'

// 加载协议列表
export const getAgreementList = (data) => {
  return axios.request({
    url: '/order/agreement/list/1',
    method: 'POST',
    data: data
  })
}
