<template>
  <div class="login">
    <div class="container" :class="[screenWidth>768? 'containerBig':'containersmall']">
      <template v-if="screenWidth>768" class="swiperPross">
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
        <el-form ref="loginform" :model="loginForm" class="loginform" label-position="left" autocomplete="on" :rules="rules">
          <el-form-item prop="account">
            <el-input ref="account" v-model="loginForm.account" type="txt" placeholder="用户名" prefix-icon="el-icon-user" autocomplete="on" name="username" tabindex="2" />
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input ref="pwd" v-model="loginForm.pwd" :type="passwordType" prefix-icon="el-icon-lock" placeholder="密码" autocomplete="on" name="password" tabindex="1" />
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
            <el-button type="primary" :loading="loading" size="medium" @click.native.prevent="handLogin()">登录</el-button>
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
      fullWidth: document.body.clientWidth,
      screenWidth: 0,
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
        account: 'admin',
        pwd: '123456',
        code: '',
        key: '',
        wxCode: ''
      },
      captchatImg: '',
      loading: false,
      rules: {
        acount: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  watch: {
    fullWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        const that = this
        setTimeout(() => {
          that.timer = false
        }, 400)
      }
    },
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
  },
  mounted() {
    this.getCaptcha()
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleResize)
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
        this.captchatImg = data.code
        this.loginForm.key = data.key
      }).catch(({
        message
      }) => {
        this.$message.error(message)
      })
    },
    handleResize(event) {
      this.fullWidth = document.body.clientWidth
    },
    handLogin() {
      this.$refs.loginform.validate(valide => {
        if (valide) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({
              path: this.redirect || '/',
              query: this.otherQuery
            })
            this.loading = false
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
    $screen-md:768px;
    .login {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('../../assets/imgs/bg.jpg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        overflow: auto;
        .container {
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
            width: 670px;
            background: #f7f7f7 !important;
        }
        .containersmall {
            width: auto !important;
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
    @media screen and (min-width: $screen-md) {
        .lgoin{
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }
    }
</style>
