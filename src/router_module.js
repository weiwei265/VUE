/**
 *  开发按需编译的路由模块
 *  require.context(目录, 是否深度遍历, 正则)
 *  author by liwei, on 2019.08.10
 */
export default [
    require.context('@/views/', true, /router\.js$/)
];
