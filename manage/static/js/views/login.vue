<template>
    <div class="login-box" id="app" >
        <el-row>
            <el-col :span="8">
                <el-input id="email"  v-model="email" placeholder="请输入帐号">
                    <template slot="prepend">帐号</template>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
                    <template slot="prepend">密码</template>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-button id="login" v-on:click="check" style="width:100%" type="primary">登录</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/javascript">
    const HttpUrl = {
        loginUrl: '/manage/users/login'
    }
export default {
    data () {
        return {
            email : '',
            password : ''
        }
    },
    methods : {
        check : function(event){
            //获取值
            var email = this.email;
            var password = this.password;
            if(email == '' || password == ''){
                this.$message({
                    message : '账号或密码为空！',
                    type : 'error'
                })
                return;
            }
            this.$.post(HttpUrl.loginUrl, {email ,password }).then( res => {
                this.$router.push('/index');
            });
        }
    }
};
</script>

<style  scoped lang="scss" type="text/css">
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
    .login-box {
        margin-top:20%;
        margin-left:40%;
    }
</style>