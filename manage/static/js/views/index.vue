<template>
    <div class="main">
        <header class="headband"></header>
        <el-row class="main">
            <el-col :span="4" class="left">
                <el-menu :router="true" >
                    <template v-for="item in menuList">
                        <el-submenu :index="item.id + ''" v-if="item.path == '/'">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                {{item.name}}
                            </template>
                            <el-menu-item-group v-if="item.children && item.children.length > 0">
                                <el-menu-item v-for="citem in item.children" :index="citem.path">
                                    {{citem.name}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item :index="item.path" v-else>
                            <i class="el-icon-setting"></i>
                            {{item.name}}
                        </el-menu-item>
                    </template>
                </el-menu>
                <el-menu :router="false">
                    <el-menu-item index="quitLogin" @click="quitLogin">
                        <i class="el-icon-setting"></i>
                        退出
                    </el-menu-item>
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
    findMenuList: '/manage/usersmenu/getMenuList',
    quitLogin: '/manage/users/quitLogin',
}
export default {
    name: 'manage-index',
    data() {
        return {
            menuList:[]
        }
    },
    created(){
        this.loadMenuList();
    },
    methods:{
        loadMenuList(){
            this.$.get(HttpUrl.findMenuList).then( res => {
                this.menuList = res.results;
            });
        },
        quitLogin(){

            // this.$.get(HttpUrl.quitLogin).then( res => {
                // this.$router.push({
                // path:'/login',
                // query:{'redirect': this.$route.fullPath}, // fullPath当前路由
                // });
            // });
        }
    }
}
</script>
<style scoped lang="scss" type="text/css">
    @import '../../css/components/index.scss';
</style>