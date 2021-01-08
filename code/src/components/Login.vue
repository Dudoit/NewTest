<template>
  <div>
  <aside>
    <div class="title">
      <div class="timg">
        <img src="../assets/bannerlogo1.png" class="bannerlogo">
        <img src="../assets/banner_bot.jpeg" class="moving-bg">
      </div>
    </div>
    <div class="describe">
      <h1>新试题管理平台</h1>
      <h1>快速管理多类型试题应用</h1>
    </div>
    <div class="supplenment">
      <p>以跨平台开发技术、定制服务、行业数据库、低代码工具</p>
      <p>全面赋能生态之力</p>
    </div>
  </aside>
  <template>
    <el-button type="text" @click="loginDialogVisible = true">点击进入 NewTest 管理平台</el-button>
    <p></p>
    <el-button type="text" @click="registerDialogVisible = true">还不是管理员？立即注册</el-button>
  </template>
    <!-- 登录弹框 -->
    <el-dialog :title="loginTitleText" :visible.sync="loginDialogVisible" width="30%" @close="loginDialogClose" center>
      <el-form ref="loginFormRef" :model="loginForm" label-width="50px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginForm.email" placeholder="请输入您的邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" @focus="secrecy" @blur="commonly" placeholder="请输入您的密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="logincenter">登录</el-button>
          <el-button @click="loginDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 注册弹框 -->
    <el-dialog :title="registerTitleText" :visible.sync="registerDialogVisible" width="30%" @close="registerDialogClose" center>
      <el-form ref="registerFormRef" :model="registerForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="为你的账户起一个名字"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" placeholder="邮箱将作为您的登录凭证"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="请牢记您的密码"></el-input>
        </el-form-item>
        <el-form-item label="内推码" prop="recommendation">
          <el-input v-model="registerForm.recommendation" placeholder="需要有内推码才可以完成注册"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即注册</el-button>
          <el-button @click="registerDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      registerForm: {},
      loginForm: {},
      loginDialogVisible: false,
      registerDialogVisible: false,
      loginTitleText: '管理员登录 🚀',
      registerTitleText: '管理员注册 🚁'
    }
  },
  methods: {
    onSubmit () {
      this.$axios({
        method: 'post',
        url: '/register',
        data: {
          username: this.registerForm.username,
          email: this.registerForm.email,
          password: this.registerForm.password,
          recommendation: this.registerForm.recommendation
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('注册用户失败')
        }
        if (res.data.err_code === 1) {
          return this.$message.warning('这个邮箱已经被注册了哦📪')
        }
        if (res.data.err_code === 3) {
          return this.$message.warning('内推码有误🤔')
        }
        this.registerDialogVisible = false
        this.$message.success('注册成功🎉')
      })
    },
    registerDialogClose () {
      this.$refs.registerFormRef.resetFields()
    },
    login () {
      this.$axios({
        method: 'post',
        url: '/login',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          email: this.loginForm.email,
          password: this.loginForm.password
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('用户登录失败')
        }
        if (res.data.err_code === 422) {
          return this.$message.warning('这个邮箱还未注册哦📪')
        }
        if (res.data.err_code === 423) {
          return this.$message.warning('请检查您的密码是否正确🤖')
        }
        sessionStorage.setItem('token', res.data.isToken)
        this.$message.success('登录成功 🎉')
        this.$router.push('/home')
      })
    },
    loginDialogClose () {
      this.$refs.loginFormRef.resetFields()
    },
    secrecy () {
      this.loginTitleText = '保护好您的密码 🙈'
    },
    commonly () {
      this.loginTitleText = '管理员登录 🚀'
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'PingFangSC-Thin', 'Muli', 'Helvetica Neue', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', 'Microsoft Yahei', sans-serif;
}
a {
  text-align: none;
  text-decoration: none;
  color: #333;
  &:hover {
    text-decoration: none;
    color: #333;
    list-style: none;
  }
}
p {
  margin: 0;
  padding: 0;
}
.title {
  .timg {
    .moving-bg {
      width: 100%;
      margin-top: 180px;
      position: absolute;
      z-index: 1;
      top: 0;
      animation: intro-img-bg 40s linear infinite alternate;
      animation-duration: 40s;
      animation-timing-function: linear;
      animation-delay: 0s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-fill-mode: none;
      animation-play-state: running;
      animation-name: intro-img-bg;
    }
  }
}
.right {
  .login {
    width: 50%;
    min-width: 90px;
    float: left;
    line-height: 75px;
  }
  .register {
    width: 50%;
    min-width: 90px;
    float: left;
    line-height: 75px;
    a {
      color: #fff;
      background-color: #9ac200;
      border-color: #9ac200;
      padding: 9px 31px;
      border-radius: 49px;
    }
  }
}
.login {
  a {
    &:hover {
      padding: 9px 31px;
      border-radius: 49px;
      background: #f2f2f2;
    }
  }
}
.register {
  a {
    &:hover {
      background: #92b800;
      border-color: #92b800;
      color: #fff;
    }
  }
}
/*  */
.title {
  width: 100%;
  height: 365px;
  padding-top: 210px;
  .timg {
    width: 62%;
    color: #fff;
    margin: 0 auto 60px;
    overflow: hidden;
    position: relative;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    box-shadow: none;
    box-sizing: border-box;
    display: block;
    .bannerlogo {
      width: 100%;
      position: relative;
      top: 0;
      left: 0;
      z-index: 10;
    }
    img {
      display: block;
      border: 0 none;
    }
  }
}

@keyframes intro-img-bg {
  0% {
    transform: translateY(-300px);
  }
  100% {
    transform: translateY(-800px);
  }
}

.describe {
  margin-top: 65px;
  margin-bottom: 24px;
  font-size: 38px;
  font-family: 'PingFangSC-Semibold';
  font-weight: 500;
  color: rgba(3, 9, 36, 1);
  line-height: 52px;
  h1 {
    margin: 0;
    text-align: center;
    font-size: 38px;
    font-family: 'PingFangSC-Semibold';
    font-weight: 500;
    color: rgba(3, 9, 36, 1);
    line-height: 52px;
  }
}
.supplenment {
  p {
    text-align: center;
    font-size: 18px;
    font-family: 'PingFangSC-Thin';
    font-weight: 100;
    color: rgba(102, 102, 102, 1);
    line-height: 32px;
    margin: 0;
  }
}

.logincenter {
  margin-left: 80px;
}
</style>
