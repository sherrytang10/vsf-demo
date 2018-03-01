<template>
    <div class="container">
        <el-form :inline="true" :model="formInline" class="form-box">
            <el-form-item label="用户名">
                <el-input v-model="formInline.userName" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formInline.email" placeholder="邮箱"></el-input>
            </el-form-item>
        <el-form-item>
            <el-button type="primary">查询</el-button>
        </el-form-item>
    </el-form>
    <div class="table-box">
        <el-table :data="userList" stripe border>
            <el-table-column prop="nickName" label="昵称"></el-table-column>
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="roleName" label="角色"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column prop="motto" label="座右铭"></el-table-column>
            <!-- <el-table-column prop="juejin" label="掘金"></el-table-column>
        <el-table-column prop="zhihu" label="知乎"></el-table-column>
        <el-table-column prop="github" label="GitHub"></el-table-column>
        -->
        <el-table-column label="操作" width="175">
            <template slot-scope="scope">
                <el-button v-if="scope.row.disabled == 0"
                  size="small"
                  type="info"
                  @click="handlePublish(scope.row, scope.$index )">启用</el-button>
                <el-button v-if="scope.row.disabled == 1"
                  size="small"
                  type="primary"
                  @click="handleDisabled( scope.row, scope.$index)">禁用</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.row, scope.$index )">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</div>
</template>
<script>
const HttpUrl = {
    findUsersAll: '/manage/users/findAll',
    disabledUsers: '/manage/users/disabled/',
    deleteUsers: '/manage/users/delete/'
}
export default {
    data(){
        return {
            formInline: {
                userName: '',
                nickName: '',
                email:''
            },
            userList: []
        }
    },
    created(){
        this.loadUserList();
    },
    methods:{
        loadUserList(){
            this.$.get(HttpUrl.findUsersAll).then( userList => {
                this.userList = userList;
            });
        },
        handleDelete(item){
            this.$confirm('此操作将永久删除用户和用户的文章, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
            }).then(() => {
                this.$.get(HttpUrl.deleteUsers + item.id).then( message => {
                    this.$message({
                        type: 'success',
                        message: '操作成功',
                        duration: 1500,
                        onClose: () => {
                            this.loadUserList();
                        }
                    });

                });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
        },
        handleDisabled(item){
            this.$.get(HttpUrl.disabledUsers + item.id).then( results => {
                this.$message({
                    type: 'success',
                    message: '操作成功'
                });
            });
        },
        handlePublish(item){
            this.$.get(HttpUrl.deleteUsers + item.id).then( results => {
                this.$message({
                    type: 'success',
                    message: '操作成功'
                });
            });
        }
    }
}
</script>
<style scoped lang="scss" type="text/css">@import '../../../css/components/list.scss';</style>