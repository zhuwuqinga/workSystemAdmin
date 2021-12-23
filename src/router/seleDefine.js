import Main from '@/components/main'
// import parentView from '@/components/parent-view'

const seleDefine = [
  {
    path: '/customer',
    name: '客户管理',
    meta: {
      icon: 'logo-buffer',
      title: '客户管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: '客户列表',
        meta: {
          title: '客户列表'
        },
        component: () => import('@/view/customer/index.vue')
      },
      {
        path: 'count',
        name: '数据统计',
        meta: {
          title: '数据统计'
        },
        component: () => import('@/view/customer/echarts.vue')
      }
    ]
  },
  {
    path: '/agreement',
    name: '协议管理',
    meta: {
      icon: 'logo-buffer',
      title: '协议管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: '协议列表',
        meta: {
          icon: 'logo-buffer',
          title: '协议列表'
        },
        component: () => import('@/view/agreement/index.vue')
      },
      {
        path: 'examination',
        name: '协议审批',
        meta: {
          icon: 'logo-buffer',
          title: '协议审批'
        },
        component: () => import('@/view/agreement/examination.vue')
      }
    ]
  },
  {
    path: '/product',
    name: '产品管理',
    meta: {
      icon: 'logo-buffer',
      title: '产品管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: '产品列表',
        meta: {
          icon: 'logo-buffer',
          title: '产品列表'
        },
        component: () => import('@/view/product/index.vue')
      },
      {
        path: 'examination',
        name: '产品审批',
        meta: {
          icon: 'logo-buffer',
          title: '产品审批'
        },
        component: () => import('@/view/product/examination.vue')
      }
    ]
  },
  {
    path: '/staff',
    name: '员工管理',
    meta: {
      icon: 'logo-buffer',
      title: '员工管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: '员工列表',
        meta: {
          icon: 'logo-buffer',
          title: '员工列表'
        },
        component: () => import('@/view/staff/index.vue')
      },
      {
        path: 'entryList',
        name: '入离职管理',
        meta: {
          icon: 'logo-buffer',
          title: '入离职管理'
        },
        component: () => import('@/view/staff/entryList.vue')
      },
      {
        path: 'moveList',
        name: '异动审批',
        meta: {
          icon: 'logo-buffer',
          title: '异动审批'
        },
        component: () => import('@/view/staff/moveList.vue')
      },
      {
        path: 'retireSet',
        name: '退休设置',
        meta: {
          icon: 'logo-buffer',
          title: '退休设置'
        },
        component: () => import('@/view/staff/retireSet.vue')
      },
      {
        path: 'examination',
        name: '证明审批',
        meta: {
          icon: 'logo-buffer',
          title: '证明审批'
        },
        component: () => import('@/view/staff/examination.vue')
      }
    ]
  },
  {
    path: '/security',
    name: '社保规则管理',
    meta: {
      icon: 'logo-buffer',
      title: '社保规则管理'
    },
    component: Main,
    children: [
      {
        path: 'index',
        name: '社保规则列表',
        meta: {
          icon: 'logo-buffer',
          title: '社保规则列表'
        },
        component: () => import('@/view/security/index.vue')
      }
    ]
  },
  {
    path: '/accumulation',
    name: '公积金规则管理',
    meta: {
      icon: 'logo-buffer',
      title: '公积金规则管理'
    },
    component: Main,
    children: [
      {
        path: 'index',
        name: '公积金规则列表',
        meta: {
          icon: 'logo-buffer',
          title: '公积金规则列表'
        },
        component: () => import('@/view/accumulation/index.vue')
      }
    ]
  },
  {
    path: '/account',
    name: '户头管理',
    meta: {
      icon: 'logo-buffer',
      title: '户头管理'
    },
    component: Main,
    children: [
      {
        path: 'index',
        name: '户头列表',
        meta: {
          icon: 'logo-buffer',
          title: '户头列表'
        },
        component: () => import('@/view/account/index.vue')
      }
    ]
  },
  {
    path: '/tax',
    name: '个税管理',
    meta: {
      icon: 'logo-buffer',
      title: '个税管理'
    },
    component: Main,
    children: [
      {
        path: 'index',
        name: '个税列表',
        meta: {
          icon: 'logo-buffer',
          title: '个税列表'
        },
        component: () => import('@/view/tax/index.vue')
      }
    ]
  },
  {
    path: '/message',
    name: '消息管理',
    meta: {
      icon: 'logo-buffer',
      title: '消息管理'
    },
    component: Main,
    children: [
      {
        path: 'index',
        name: '消息列表',
        meta: {
          icon: 'logo-buffer',
          title: '消息列表'
        },
        component: () => import('@/view/message/index.vue')
      }
    ]
  },
  {
    path: '/set',
    name: '系统设置',
    meta: {
      icon: 'logo-buffer',
      title: '系统设置'
    },
    component: Main,
    children: [
      {
        path: 'dictList',
        name: '字典管理',
        meta: {
          icon: 'logo-buffer',
          title: '字典管理'
        },
        component: () => import('@/view/set/dictList.vue')
      },
      {
        path: 'menuList',
        name: '菜单管理',
        meta: {
          icon: 'logo-buffer',
          title: '菜单管理'
        },
        component: () => import('@/view/set/menuList.vue')
      },
      {
        path: 'roleList',
        name: '角色管理',
        meta: {
          icon: 'logo-buffer',
          title: '角色管理'
        },
        component: () => import('@/view/set/roleList.vue')
      },
      {
        path: 'userList',
        name: '平台用户管理',
        meta: {
          icon: 'logo-buffer',
          title: '平台用户管理'
        },
        component: () => import('@/view/set/userList.vue')
      },
      {
        path: 'remindList',
        name: '自定义提醒设置',
        meta: {
          icon: 'logo-buffer',
          title: '自定义提醒设置'
        },
        component: () => import('@/view/set/remindList.vue')
      }
    ]
  }
]

export default seleDefine
