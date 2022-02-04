<template>
  <a-row type="flex" align="middle">
    <a-col span="5" offset="7" type="flex">
      <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
              v-model="userName"
              placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
              v-model="password"
              type="password"
              placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox>
            Remember me
          </a-checkbox>
          <a class="login-form-forgot" href="">
            Forgot password
          </a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            Log in
          </a-button>
          第三方登录
          <a :href="githubAuth">
            <a-icon type="github" style="font-size: 20px"/>
          </a>
          <a :href="giteeAuth" style="margin-left: 10px">
<!--            <a-icon type="github" style="font-size: 20px"/>-->
            <svg class="icon" aria-hidden="true" style="font-size: 20px">
              <use xlink:href="#icon-gitee"></use>
            </svg>
          </a>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import {defaultHeadUrl,githubAuth,giteeAuth} from "@/const";
export default {
  name: "Login",
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  data() {
    return{
      userName: '',
      password: '',
      defaultHeadUrl,
      githubAuth,
      giteeAuth
    }
  },
  methods: {
    handleSubmit() {
      // e.preventDefault();

      let user={
        name: this.userName,
        pass: this.password,
      }
      this.$axios.login(user).then(resp=>{
        console.log(resp)
        if (resp.code!=200){
          this.$message.error(resp.msg)
        }else {
          sessionStorage.setItem('userInfo',JSON.stringify(resp.data))
          this.$router.push({path:'/main',query:resp.data})
        }
      })

    },
  },
}
</script>

<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>