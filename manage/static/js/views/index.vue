<template>
    <div class="main">
        <header class="headband"></header>
        <el-row class="main">
            <el-col :span="4" class="left">
                <el-menu default-active="2"  class="el-menu-vertical-demo" :router="true" >
                    <template v-for="item in menuList" :key="item.id">
                        <template slot="title" v-if="item.path">
                            <el-menu-item :index="item.path">
                                <i class="el-icon-setting"></i>
                                {{item.name}}
                            </el-menu-item>
                        </template>
                    </template>
                    <!-- <el-submenu index="1">
                        <template slot="title"> <i class="el-icon-message"></i>
                            用户中心
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/userList">
                                用户管理
                            </el-menu-item>
                            <el-menu-item index="/userSave">
                                用户添加
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"> <i class="el-icon-message"></i>
                            文章中心
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/articleList">
                                文章管理
                            </el-menu-item>
                            <el-menu-item index="/articlePulish">

                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        退出
                    </el-menu-item> -->
                </el-menu>
            </el-col>
            <el-col  :span="20">
                <el-breadcrumb separator="/" class="breadcrumb">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/articlePulish'}">暂未实现</el-breadcrumb-item>
                </el-breadcrumb>
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script>
const HttpUrl = {
    findMenuList: '/restapi/user/menuList',
}
export default {
    name: 'manage-index',
    data() {
        return {}
    },
    created(){
        this.loadMenuList();
    },
    methods:{
        loadMenuList(){
            this.$.get(HttpUrl.findMenuList).then( res => {
                this.menuList = res.results;
            });
        }
    }
}
</script>
<style scoped lang="scss" type="text/css">
    @import '../../css/components/index.scss';
</style>