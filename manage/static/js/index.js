'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from './vuex/store.js';
import routes from './router/route.js';

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import axios from 'axios';

import '../css/layout.scss';


Vue.use(Element);
Vue.use(VueRouter);



// 创建子类，避免配置污染全局
let axiosIns = axios.create({});

// 设定子类的配置信息
// axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

// 子类的拦截器，对结果是否正常做出判断
axiosIns.interceptors.response.use( res =>{
    // 对响应数据做点什么
    let data = res.data;
    let status = res.status;
    if(status===200 || status === 304 || status === 201){
        status = data.status;
        if(status === 998){
            app.$router.push({
                path:'/login',
                query:{'redirect':app.$route.fullPath},
            });
        } else if(status === 0) {
            // app.$alert(data.errmsg, '系统异常', {
            //     confirmButtonText: '确定'
            // });
            app.$message.error(data.errmsg);
            return Promise.reject(res);
        } else {
            return data.results;
        }
    }else{
        return Promise.reject(res);
    }
},  error => {
    // 对响应错误做点什么
    return Promise.reject(error)
});

let ajaxMethod = ['get','post'];
let api = {};
ajaxMethod.forEach((method)=>{
    api[method] = function(uri,data,config){
        // 对axios包装的一层
        return new Promise(function(resolve,reject){
            axiosIns[method](uri,data,config).then((json)=>{
                resolve(json);
            }).catch((response)=>{
                // 拦截器里reject都会走到这里
                if(response.status===200 && response.data.status == 0){
                    app.$message(response.data.errmsg);
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

import IndexComponents from './views/index.vue';

const app = new Vue({
    el: '#app',
    components:{
        [IndexComponents.name]: IndexComponents
    },
    router,
    // store
});
