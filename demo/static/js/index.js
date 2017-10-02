'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from './vuex/store.js';
import routes from './router/route.js';
import axios from './common/axios.js';
// import '../css/iconfont/iconfont.css';

Vue.use(VueRouter);
Vue.use(axios);

import SfVue from './self/sfVue.js';
Vue.use(SfVue);

const router = new VueRouter({
    // 默认hash
    // mode: 'history',
    routes
});

const app = new Vue({
    el: '#app',
    router,
    // store
});