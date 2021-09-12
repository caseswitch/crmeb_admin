<template>
  <div class="login">
    <div class="container containerBig">
      <template class="swiperPross">
        <swiper :options="swiperOption">
          <swiper-slide class="swiperPic">
            <img src="../../images/logo1.png" alt="">
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination" />
        </swiper>
      </template>
      <div class="index_from">
        <div class="page-account-top ">
          <div class="page-account-top-logo">
            <img src="../../images/logo2.png" alt="logo">
          </div>
        </div>
        <el-form ref="loginform" :model="loginForm" class="loginform" label-position="left" autocomplete="on">
          <el-form-item prop="acount">
            <el-input ref="username" v-model="loginForm.username" type="txt" placeholder="用户名" prefix-icon="el-icon-user" autocomplete="on" name="username" tabindex="2" />
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input ref="pwd" v-model="loginForm.password" :type="passwordType" prefix-icon="el-icon-lock" placeholder="密码" autocomplete="on" name="password" tabindex="1" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class=" passwordType === 'password' ? 'eye':'eye-open'" />
            </span>
          </el-form-item>
          <el-form-item prop="code">
            <div class="captcha">
              <el-input v-model="loginForm.code" name="code" type="txt" prefix-icon="el-icon-message" placeholder="验证码" tabindex="3" autocomplete="on" />
              <div class="imgs" @click="getCaptcha()"><img :src="captchatImg" alt=""></div>
            </div>
          </el-form-item>
          <div class="submit">
            <el-button type="primary" :loading="loading" size="medium">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  captchaApi
} from '@/api/user'
export default {
  name: '',
  data() {
    return {
      passwordType: 'password',
      swiperOption: {
        pagination: {
          el: '.pagination'// 是否分页
        },
        autoplay: {
          enabled: true,
          disableOnInteraction: false,
          delay: 3000
        }
      },
      loginForm: {
        username: 'admin',
        password: '123456',
        code: '',
        key: ''
      },
      captchatImg: '',
      loading: false
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.getCaptcha()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    getCaptcha() {
      captchaApi().then((data) => {
        console.log(data)
        this.captchatImg = data.code
        this.loginForm.key = data.key
      }).catch(({
        message
      }) => {
        this.$message.error(message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .login {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('../../assets/imgs/bg.jpg');
        .container {
            width: 670px;
            height: 400px;
            padding: 0 !important;
            border-radius: 6px;
            z-index: 1;
            display: flex;
            .swiperPross,
            .swiperPic,
            .swiperPic img {
                width: 286px;
                height: 100%;
             }
        }
        .containerBig {
            background: #f7f7f7 !important;
        }
        .index_from {
            box-sizing: border-box;
            width: 384px;
            height: 400px;
            padding: 0 40px 32px 40px;
            .page-account-top  {
                 padding: 20px 0;
            }
            .loginform {
                position: relative;
                max-width: 100%;
                overflow: hidden;
            }
            .show-pwd {
                position:absolute;
                right: 18px;
            }
            .captcha {
                display: flex;
                align-items: flex-start;
                .el-input {
                    width: 218px
                }
                .imgs {
                    margin-left: 12px;
                    width: 80px;
                }
            }
            .submit {
                .el-button {
                    text-align: center;
                    width: 100%;
                    font-size: 14px;
                    font:120% tahoma,\5b8b\4f53,arial
                }
            }

        }

    }
</style>
