import Vue from 'vue';
import Router from 'vue-router';
import DEVELOP_ROUTER_MODULE from '@/router_module';

Vue.use(Router);

/**
 *  加载路由模块
 *  author by liwei, on 2019.08.10
 */
function loadRouterModule () {
    // 注册开发配置下的路由模块
    let routerModules = DEVELOP_ROUTER_MODULE;

    let routers = [];

    // 自动扫描注册所有路由模块
    if (process.env.NODE_ENV === 'production') {
        routerModules = [
            require.context('@/views/', true, /router\.js$/)
        ];
    }

    for (const rcModule of routerModules) {
        routers = routers.concat((r => {
            // 获取所有扫描到的路由
            var routers = r.keys().map(key =>
                r(key).default
            );
            routers = [].concat(...routers);
            return routers;
        })(rcModule));
    }

    return routers;
}

export default new Router({
    routes: [{
        path: '/',
        redirect: '/user/login'
    }].concat(loadRouterModule())
});
