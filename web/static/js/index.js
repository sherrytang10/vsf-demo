'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from './vuex/store.js';
import routes from './router/route.js';
import axios from 'axios';

import '../css/layout.scss';

Vue.use(VueRouter);
// Vue.use(axios);

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