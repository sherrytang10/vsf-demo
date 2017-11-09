'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex/store.js';
import routes from './router/route.js';
import axios from 'axios';
import '../css/layout.scss';

import IndexVue from './views/index.vue';
Vue.use(VueRouter);




// 创建子类，避免配置污染全局
let axiosIns = axios.create({});

// 设定子类的配置信息
// axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

// axiosIns.defaults.baseURL = 'http://localhost:7779';
axiosIns.defaults.headers.post['Content-Type'] = 'application/jsoned';

// 子类的拦截器，对结果是否正常做出判断
axiosIns.interceptors.response.use(res => {
    // 对响应数据做点什么
    let data = res.data;
    let status = res.status;
    if (status === 200 || status === 304 || status === 201) {
        status = data.status;
        if (status === 998) {
            app.$router.push({
                path: '/login',
                query: { 'redirect': app.$route.fullPath },
            });
        } else if (status === 0) {
            // app.$message.error(data.errmsg);
            console.log(data.errmsg);
            return Promise.reject(res);
        } else {
            return data;
        }
    } else {
        return Promise.reject(res);
    }
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error)
});

let ajaxMethod = ['get', 'post'];
let api = {};
ajaxMethod.forEach((method) => {
    api[method] = function(uri, data, config) {
        // 对axios包装的一层
        return new Promise(function(resolve, reject) {
            axiosIns[method](uri, data, config).then((json) => {
                resolve(json);
            }).catch((response) => {
                // 拦截器里reject都会走到这里
                if (response.status === 200 && response.data.status == 0) {
                    // app.$message(response.data.errmsg);
                    console.log(response.data.errmsg)
                }
            })
        })
    }
});
Vue.prototype.$ = api;


const router = new VueRouter({
    // 默认hash
    // mode: 'history',
    routes
});


const app = new Vue({
    el: '#app',
    components: {
        [IndexVue.name]: IndexVue
    },
    router,
    store
});