import axios from 'axios';
import sessionApi from '@/core/session';
import qs from 'qs';
import { Message } from 'element-ui';

// 创建Axios
const service = axios.create({
    // timeout: 5
});

// 请求拦截器 - 设置token
service.interceptors.request.use(
    config => {
        const token = sessionApi.get('token');
        if (token) {
            config.headers['access-token'] = token;
        }
        if (config.method === 'post') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            config.data = qs.stringify(config.data);
        } else {
            config.params = config.data;
            config.data = null;
        }
        return config;
    },
    error => {
        // do something with request error
        console.log('interceptors.request:', error); // for debug
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    // HTTP请求成功
    response => {
        console.log('response', response);
        // 增加excel下载操作
        // author by:lw, on: 2019-03-12
        if (response.config.responseType) {
            let fileName = response.config.fileName || '模版.xls';
            fileDownload(response.data, fileName);
            return Promise.resolve({ data: 'ok' });
        }
        // console.warn('service.interceptors.response:', response);
        if (response.status === 200) {
            const result = response.data;

            if ((result).hasOwnProperty('code')) {
                if (result.code === 0) {
                    return result;
                } else {
                    return Promise.reject(result);
                }
            } else {
                throw new Error('接口格式不正确，需要返回 { code: 状态码, message: 消息, data: 数据 }');
            }
        } else {
            // 理论上不会执行到该代码
            // console.error('interceptors.response.error-1:', response);
            return Promise.reject(new Error('HTTP请求非200'));
        }
    },
    // HTTP请求错误（400到600）
    error => {
        // console.error('interceptors.response.error-2', error.response); // for debug
        if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
            // console.warn('errormessage-timeout', error);
            Message.error('超时～～');
            // return Promise.reject(error); // reject这个错误信息
        } else {
            // console.warn('errormessage-error', error);
            Message.error('服务错误');
            return Promise.reject(error);
        }
    }
);

// 下载函数
let fileDownload = function (data, filename, mime) {
    var blob = new Blob([data], { type: mime || 'application/octet-stream' });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        var blobURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);

        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }

        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
};

export default service;
