export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    children: [
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        exact: true,
      },
      {
        path: '/dashboard/monitor',
        name: 'monitor',
        exact: true,
      },
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        exact: true,
      },
    ],
  },
  {
    path: '/homee',
    name: 'welcome',
    icon: 'dashboard',
    children: [
      {
        path: '/homee/analysis',
        name: 'analysis',
        exact: true,
      },
      {
        path: '/homee/monitor',
        name: 'monitor',
        exact: true,
      },
      {
        path: '/homee/workplace',
        name: 'workplace',
        exact: true,
      },
    ],
  }
]
