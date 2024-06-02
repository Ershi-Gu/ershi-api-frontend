export default [
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/interface', name: '接口', icon: 'apiOutlined', component: './Index' },
  { path: '/interface_info/:id', name: '查看接口', icon: 'smile', component: './InterfaceInfo', hideInMenu: true },
  { path: '/open_sdk', name: '开发平台', icon: 'bugOutlined', component: './OpenSDK'},
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login'},
      { name: '注册', path: '/user/register', component: './User/Register'}
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/interface' },
      { name: '接口管理', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
