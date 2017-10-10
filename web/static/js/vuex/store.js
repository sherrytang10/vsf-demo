'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

import author from './modules/author.js';

Vue.use(Vuex);


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
            // app.$message.error(data.errmsg);
            console.log(data.errmsg);
            return Promise.reject(res);
        } else {
            return data;
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
                    // app.$message(response.data.errmsg);
                    console.log(response.data.errmsg)
                }
            })
        })
    }
});
Vue.prototype.$ = api;


let store = new Vuex.Store({
    // 插件挂载
    // 很多插件不推荐在生产用 所以借助构建工具来处理Webpack 或 Browserify
    // PRODUCTION  webpack.config 中 new webpack.DefinePlugin定义
    plugins: !!PRODUCTION ? [createLogger()] : [],
    modules:{
        author
    },
    // 组件调用store.state.xxx
    state: {
        // $: Vue.prototype.$
    },
    getters:{
        ...getters,
    },
    actions:{
        ...actions,
        ...api
    },
    mutations
});
// 注册模块 `list`
// store.registerModule('evaluate', evaluateStore);
export default store;