<template>
<div class="container">
    <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" class="form-box user-form">
        <el-form-item label="用户名" prop="email">
            <el-input class="width50" v-model="userInfo.email" placeholder="请输入用户名称，长度2-8个字符"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
            <el-input class="width50" v-model="userInfo.nickName" placeholder="请输入用户昵称，长度1-16个字符"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input class="width50"  type="password" v-model="userInfo.password"placeholder="请输入用户密码"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="roleId">
            <el-select class="width50" v-model="userInfo.roleId" placeholder="请选择">
                <el-option
                  v-for="item in usersGroup"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('userInfo')">立即创建</el-button>
            <el-button @click="resetForm('userInfo')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
    const HttpUrl = {
        getOneById: '/manage/users/getOneById',
        saveUrl: '/manage/users/save',
        usersRoleList: '/manage/usersrole/findAll'
    }
  export default {
    data() {
      return {
        userInfo: {
            email: '',
            nickName: '',
            password: '',
            roleId: 0
        },
        usersGroup:[{
          id: 0,
          name: '临时用户'
        }],
        rules: {
            email: [
                { required: true, message: '请输入电子邮箱', trigger: 'blur' }
            ],
            nickName: [
                { required: true, message: '用户昵称长度在 1 到 16 个字符', trigger: 'blur' },
                { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入用户密码，默认123456', trigger: 'blur' },
                { min: 2, max: 26, message: '长度在6 到 26 个字符', trigger: 'blur' }
            ],
            roleId: [
                { required: true, message: '请选择用户组'}
            ]
        }
      };
    },
    created(){
        this.loadUsersRoleList().then( () => {
            this.getUsersInfo();
        })
    },
    methods: {
      loadUsersRoleList(){
        return this.$.get(HttpUrl.usersRoleList).then( results => {
            this.usersGroup = results;
        });
      },
      getUsersInfo(){
            let {id} = this.$route.params;
            if(id){
                this.$.get(`${HttpUrl.getOneById}?id=${id}`).then( userInfo => {
                    console.log(userInfo)
                    this.userInfo = userInfo;
                });
            }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.registerUsers();
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      registerUsers(){
        this.$.post(HttpUrl.saveUrl, this.userInfo).then( results => {
            this.$router.push('/userList');
        });
      }
    }
  }
</script>
<style scoped lang="scss" type="text/css">
    @import '../../../css/components/user/user.add.scss';
</style>