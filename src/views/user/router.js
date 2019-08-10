export default [
    {
        name: 'user-login',
        path: '/user/login',
        component: () => import('./login.vue'),
        meta: { title: '登录页面', keepAlive: true }
    }
];
