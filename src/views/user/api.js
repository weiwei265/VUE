import request from '@/core/request';
import config from '@/config'; // 配置

export const testApi = (data, opt) => request({ url: config.url + '/getTest1', data, method: 'get', ...opt });
