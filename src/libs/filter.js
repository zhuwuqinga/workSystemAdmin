import Vue from 'vue'

// 协议审核状态
Vue.filter('statusTxt', target => {
  let type = ''
  switch (target) {
    case '0':
      type = '禁用'
      break
    case '1':
      type = '启用'
      break
  }
  return type
})
