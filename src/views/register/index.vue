<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">用户注册</h3>
    </div>
    <el-form ref="form" :model="form" label-width="120px" class="login-form" @submit.prevent="onSubmit">
      <el-form-item label="用户名" class="tips">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input :key="passwordType" v-model="form.password" :type="passwordType" />
      </el-form-item>
      <el-form-item label="再次输入密码">
        <el-input :key="passwordType" v-model="password_repeat" :type="passwordType" />
      </el-form-item>
      <el-form-item label="农场/公司名称">
        <el-input v-model="form.farmname" />
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.phone_number" />
      </el-form-item>
      <div id="test" class="inline_block">
        <el-button type="primary" style="width:50%;margin-bottom:50p;display:block;margin:0 auto" @click="onSubmit">提交</el-button>
        <el-button type="primary" style="width:50%;margin-bottom:30px;right:0px;display:block;margin:0 auto" @click="goTo">返回登录</el-button>
      </div>

    </el-form>

  </div>
</template>
<script>

import { validUsername } from '@/utils/validate'
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '123456',
        phone_number: '',
        farmname: '',
        name: ''
      },
      password_repeat: '123456',
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    onSubmit() {
      const cloud = 'https://qingjiao.shop:8000'
      const local = 'http://127.0.0.1:8000/'
      var serverurl = cloud
      if (this.isValidate(this.form)) {
        console.log('validated', this.form)
        const formData = new FormData()
        for (var key in this.form) {
          formData.append(key, this.form[key])
        }
        console.log(formData)
        axios.post(serverurl + '/api/register/', formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
          .then(function(response) {
            alert(JSON.stringify(response.data))
            if (JSON.stringify(response.data) == '注册成功') {
              this.goTo()
            } else {

            }
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    isValidate(form) {
      if (form.username) {
        if (form.password.length >= 6) {
          if (form.password == this.password_repeat) {
            return true
          } else {
            alert('两次密码不一致')
            return false
          }
        }
      }
      console.log('invalid')
      return false
    },
    goTo() {
      this.$router.push({ name: 'login' })
    }
  }

}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.inline-block {
  display: inline-block;
}
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding:  35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 100px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

}
</style>
