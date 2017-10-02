<template>
<div class="container">
    <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" class="form-box user-form">
        <el-form-item label="用户名" prop="userName">
            <el-input class="width50" v-model="userInfo.userName" placeholder="请输入用户名称，长度2-8个字符"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
            <el-input class="width50" v-model="userInfo.nickName" placeholder="请输入用户昵称，长度1-16个字符"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
            <el-input class="width50"  type="password" v-model="userInfo.passWord" value="123456" placeholder="请输入用户密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
  export default {
    data() {
      return {
        userInfo: {
            userName: '',
            nickName: '',
            passWord: '123456'
        },
        rules: {
            userName: [
                { required: true, message: '请输入用户名称', trigger: 'blur' },
                { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
            ],
            nickName: [
                { required: true, message: '用户昵称长度在 1 到 16 个字符', trigger: 'blur' },
                { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
            ],
            passWord: [
                { required: true, message: '请输入用户密码，默认123456', trigger: 'blur' },
                { min: 2, max: 26, message: '长度在6 到 26 个字符', trigger: 'blur' }
            ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped lang="scss" type="text/css">
    @import '../../../css/components/user/user.add.scss';
</style>