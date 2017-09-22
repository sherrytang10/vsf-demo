> 仿写一个蘑菇租房app的小demo， 练手
# koa-all

基于[Vue](https://github.com/vuejs/vue)的一个UI组件小demo。。

[![NPM version](https://img.shields.io/npm/v/express.svg)](https://www.npmjs.com/package/express)

## 一、简介

集成vue + vue-router

[Express](http://www.expressjs.com.cn/) 搭建web服务
[Webpack](http://webpack.github.io/docs/)构建打包

**注意：请确保你的运行环境中Nodejs的版本至少是`v4.0.0`，目前需要依赖Babel。
### 安装

执行命令：
```
$ git clone https://github.com/qualc/vsf.git
$ cd vsf && npm install
```

### 运行

然后，执行命令：
```
$ npm run 启动服务
$ npm run build 启动编译
```

然后访问：[http://127.0.0.1:3000](http://127.0.0.1:3000/) 就可以看到示例了！

## 三、案例说明
按照app首页写一个实现demo

### 目录结构

├── dist 

│   ├── css 

│   ├── images 
│   ├── iconfont 
│   ├── js 
│   └── index.html 
├── src 
│   ├── data 
│   ├── router 
├── static 
│   ├── js 
│   │   ├── common
│   │   ├── components
│   │   ├── router
│   │   ├── self UI库
│   │   ├── views
│   │   ├── vuex  未集成
│   ├── template
│   └── index.html
└── app.js

```

其中：

* `dist`webpack编译后
* `static`前端开发
* `app`express启动文件

