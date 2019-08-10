import Vue from 'vue';
import App from './app.vue';
import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import SessionStorage from './core/session';
import router from './router';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$message = Message;

Vue.prototype.$session = SessionStorage;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
