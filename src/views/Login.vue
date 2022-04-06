<!--
 * @Author: Binggan
 * @Date: 2022-02-24 11:23:29
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-02 16:56:34
 * @Description:登录页
-->

<template>
  <div class="flex align-center justify-center login-page">
    <div class="decoration">
      <img src="../assets/images/login/login_left.png" />
    </div>
    <div class="login-box">
      <h2 class="text-center">{{ $store.state.app.title }}</h2>
      <div class="login-form-wrapper">
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
        >
          <el-form-item class="form-icon username" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item class="form-icon password" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            :loading="loginLoading"
            @click="handleLogin"
            >{{ loginLoading ? "登陆中" : "登录" }}</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {},
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change"
          }
        ]
      },
      loginLoading: false
    };
  },
  methods: {
    handleLogin() {
      // TODO 待对接接口，处理登录流程
      this.loginLoading = true;
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          console.log("登录信息", this.loginForm);

          setTimeout(() => {
            this.$store.dispatch("user/Login", this.loginForm).then(() => {
              this.$router
                .push({ path: this.redirect || "/" })
                .then(() => {
                  // this.loginLoading = false;
                })
                .catch(() => {});
              // this.loginLoading = false;
            });
          }, 1000);
        } else {
          this.$message({
            showClose: true,
            message: "请输入用户名或密码",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/login/login_bg.jpg");
  background-size: cover;
  .decoration {
    width: 1940px;
    img {
      width: 100%;
    }
  }
  .login-box {
    width: 2300px;
    color: #fff;
    margin-left: -80px;
    h2 {
      font-size: 140px;
      letter-spacing: 15px;
    }
    .login-form {
      &-wrapper {
        width: 1200px;
        min-height: 924px;
        margin: 100px auto 0;
        background: url("../assets/images/login/login_right.png") no-repeat;
        background-size: cover;
        text-align: center;
      }
      display: inline-block;
      width: 892px;
      margin: 200px 0 auto 0;

      &::v-deep {
        .el-form-item {
          // margin-bottom: 52px;
          input {
            height: 132px;
            width: 892px;
            border-radius: 10px;
            background-color: rgba(43, 121, 186, 0.39);
          }
          .el-input__inner {
            border-radius: 10px;
            border: 10px solid #00a0e9;
            font-size: 40px;
            font-family: "microsoft yahei";
            font-weight: 400;
            background-color: transparent;
            color: #ffffff;
            letter-spacing: 5px;
            margin: 0 auto;
            opacity: 0.64;
          }
        }
      }
      .form-icon {
        background-color: rgba(43, 121, 186, 0.39);
        &.username ::v-deep .el-input__inner {
          background-image: url("../assets/images/login/login-user.png");
          background-repeat: no-repeat;
          background-size: 42px 48px;
          background-position: 54px 33px;
          padding-left: 154px;
        }
        &.password ::v-deep .el-input__inner {
          background-image: url("../assets/images/login/login-password.png");
          background-repeat: no-repeat;
          background-size: 42px 48px;
          background-position: 54px 33px;
          padding-left: 154px;
        }
      }
      .login-btn {
        display: block;
        letter-spacing: 36px;
        border: 0 none;
        cursor: pointer;
        width: 892px;
        height: 132px;
        line-height: 132px;
        background: linear-gradient(180deg, #0790cf, #6cd0fc);
        box-shadow: 0px 0px 10px 0px #085998;
        border-radius: 10px;
        font-size: 48px;
        font-weight: 400;
        color: #ffffff;
        padding: 0;
      }
    }
  }
}
</style>
