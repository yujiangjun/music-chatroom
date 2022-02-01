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
          <a-checkbox
              v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
          >
            Remember me
          </a-checkbox>
          <a class="login-form-forgot" href="">
            Forgot password
          </a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            Log in
          </a-button>
          第三方登录
          <a :href="githubAuth" target="_blank">
            <a-icon type="github" style="font-size: 20px"/>
          </a>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import {defaultHeadUrl,defaultHeadUrl2,githubAuth} from "@/const";
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
      githubAuth
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.$store.commit({
            type: 'saveUserInfo',
            payload: {
              id: this.userName==='joe'?2:1,
              name: this.userName,
              head: this.userName==='joe'?defaultHeadUrl:defaultHeadUrl2
            }
          })
          let user={
            id: this.userName==='joe'?2:1,
            name: this.userName,
            head: this.userName==='joe'?defaultHeadUrl:defaultHeadUrl2
          }
          sessionStorage.setItem('userInfo',JSON.stringify(user))
          this.$router.push({path:'/main'})
        }
      });
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