export default [
  {
    path: '/companyList',
    name: 'CompanyList',
    component: () => import(/* webpackChunkName: "CompanyList" */ 'views/remoteSup/CompanyList.vue'),
    meta: {
      auth: false,
      title: '公司列表',
      keepAlive: true
    }
  },
  {
    path: '/companyDetail/:id',
    name: 'CompanyDetail',
    component: () => import(/* webpackChunkName: "CompanyDetail" */ 'views/remoteSup/CompanyDetail.vue'),
    meta: {
      auth: false,
      title: '公司详情',
      keepAlive: false
    }
  },
  {
    path: '/spot',
    name: 'Spot',
    component: () => import(/* webpackChunkName: "Spot" */ 'views/remoteSup/Spot.vue'),
    meta: {
      auth: false,
      title: '现场执法',
      keepAlive: false
    }
  }
]
