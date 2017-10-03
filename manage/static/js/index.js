'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from './vuex/store.js';
import routes from './router/route.js';

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import axios from './common/axios.js';

import '../css/layout.scss';


Vue.use(Element);
Vue.use(VueRouter);
Vue.use(axios, Element.MessageBox);

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