<template>
<div class="container">
    <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" class="form-box user-form">
        <el-form-item label="电子邮箱" prop="email">
            <el-input class="width50" v-model="userInfo.email" placeholder="请输入电子邮箱"></el-input>
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
        <el-form-item label="用户名" prop="userName">
            <el-input class="width50" v-model="userInfo.userName" placeholder="请输入用户名，长度2-8个字符"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
            <el-input class="width50" v-model="userInfo.phone" placeholder="请输入联系方式"></el-input>
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
            phone: '',
            nickName: '',
            userName: '',
            password: '',
            roleId: 0
        },
        usersGroup:[{
          id: 0,
          name: '临时用户'
        }],
        rules: {
            email: [
                { required: true, type:'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
            ],
            nickName: [
                { required: true, pattern: /^([a-zA-Z\.\s\u4e00-\u9fa5]{2,20})$/,message: '请输入用户昵称，长度 2 到 8 个中文字符或者 2 到 20 个英文字符', trigger: 'blur' },
                { pattern: /^([a-zA-Z\.\s\u4e00-\u9fa5]{2,20})$/, message: '用户昵称为长度 2 到 8 个中文字符或者 2 到 20 个英文字符', trigger: 'blur' }
            ],
            userName: [
                { message: '请输入用户名，长度 2 到 8 个中文字符或者 2 到 20 个英文字符',  trigger: 'blur' },
                { pattern: /^([\u4e00-\u9fa5]{2,8}|[a-zA-Z\.\s]{2,20})$/, message: '用户名为长度 2 到 8 个中文字符或者 2 到 20 个英文字符', trigger: 'blur' }
            ],
            phone: [
                { message: '请填写11位长度的手机号码', trigger: 'blur' },
                { pattern: /^1\d{10}$/, message: '请填写11位长度的手机号码', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入用户密码', trigger: 'blur' },
                { min: 6, max: 26, message: '长度在6 到 26 个字符', trigger: 'blur' }
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