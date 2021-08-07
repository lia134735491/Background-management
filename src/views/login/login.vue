
<template>
  <div class="login-container">
      <div class="login-form-wrap">
          <div class="login-head">
              <div class="logo"></div>
          </div>
          <el-form
          :model="user"
          ref="login-form"
          :rules="rules"
          class="login-form"
          >
                <el-form-item prop="mobile">
                    <el-input v-model="user.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
                </el-form-item>
                <el-form-item prop="agree">
                    <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-btn" type="primary" :loading="loginLoading" @click="onLogin">登录</el-button>
                </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default { 
  name: 'login',
  data () {
    //   let checkage = (rule, value, callback) => {
    //                     if(value) {
    //                       callback()
    //                     } else {
    //                       callback(new Error('请同意协议'))
    //                     }
    //                 }
    return {
        loginLoading: false,
        user:{
            mobile: '13911111111',
            code: '246810',
            agree: false
        },
        rules:{
             mobile:[
                 {require:true,message:'请输入手机号码',trigger:'blur'},
                 {pattern: /^1[3|5|7|8|9]\d{9}$/,message:'请输入正确的手机格式',trigger:'blur'}
             ],
             code:[
                 { required: true, message: '验证码不能为空', trigger: 'blur' },
                 { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
             ],
             agree: [
                {
                    validator: (rule, value, callback) => {
                        if(value) {
                          callback()
                        } else {
                          callback(new Error('请同意协议'))
                        }
                    },
                    trigger: 'blur'
                }
             ]
        }
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
      onLogin() {
          this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败，停止请求提交
                if (!valid) {
                    // console.log(valid)
                return
                }
                 this.login()
            })      
      },

      async login() {
          this.loginLoading = true
                let userData = await login(this.user)
                let user = userData.data.data
                if(user) {
                    this.loginLoading = false
                    this.$message('登录成功')
                    localStorage.setItem('user',JSON.stringify(user))
                    this.$router.push('/')
                }
      }
  }
}

</script>
<style lang='scss' scoped>
.login-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url("./login_bg.jpg") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form-wrap {
        min-width: 300px;
        padding: 30px 50px 10px;
        background-color: #fff;
        .login-head {
            display: flex;
            justify-content: center;
            .logo {
                width: 200px;
                height: 57px;
                background: url("./logo_index.png") no-repeat;
                background-size: contain;
            }
        }
        .login-form {
            .login-btn {
                width: 100%;
            }
        }
    }
}
</style>
