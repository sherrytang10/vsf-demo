<template>
<div class="container">
    <el-form :inline="true" :model="formInline" class="form-box">
        <el-form-item label="用户名">
            <el-input v-model="formInline.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
            <el-input v-model="formInline.nickName" placeholder="昵称"></el-input>
        </el-select>
        </el-form-item><el-form-item>
            <el-button type="primary">查询</el-button>
        </el-form-item>
    </el-form>
    <div class="table-box">
        <el-table :data="userList" stripe border style="width: 100%" max-height="20px">
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="nickName" label="昵称"></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column prop="juejin" label="掘金"></el-table-column>
            <el-table-column prop="zhihu" label="知乎"></el-table-column>
            <el-table-column prop="github" label="GitHub"></el-table-column>
            <el-table-column label="操作" width="80">
                <template scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
    </div>
</div>
</template>
<script>
const HttpUrl = {
    findUserAll: '/manage/user/findAll',
}
export default {
    data(){
        return {
            formInline: {
                userName: '',
                nickName: ''
            },
            userList: []
        }
    },
    created(){
        this.loadUserList();
    },
    methods:{
        loadUserList(){
            this.$.get(HttpUrl.findUserAll).then( res => {
                this.userList = res.results;
            });
        },
        handleEdit(){

        }
    }
}
</script>
<style scoped lang="scss" type="text/css">
    @import '../../../css/components/list.scss';
</style>