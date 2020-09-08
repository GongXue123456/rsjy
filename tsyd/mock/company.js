import Mock from 'mockjs'

const List = []
const count = 20

const baseContent = '<p>I am testing data, I am testing data.</p>'
const imageUri = 'https://img.yzcdn.cn/vant/cat.jpeg'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name:"@cword(3,7)",
    address:"@county(true)",
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    imageUri,
    platforms: ['a-platform']
  }))
}

export default [
  {
    url: '/company/list',
    type: 'post',
    response: config => {
      const { importance, type, title, page = 1, pageSize = 20, sort } = config.body

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1))

      return {
        code: 200,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/company/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const company of List) {
        if (company.id === +id) {
          return {
            code: 200,
            data: company
          }
        }
      }
    }
  },

  {
    url: '/company/pv',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/company/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/company/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
