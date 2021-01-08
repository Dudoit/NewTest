<template>
  <el-container>
    <!-- 顶部用户信息页面 -->
    <el-header>
      <div>
        <img src="../assets/logo3.png" alt="">
        <span>新试题后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 侧边导航栏 -->
    <el-container>
    <el-aside width="200px">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="gothehome">
          <i class="el-icon-house"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-monitor"></i>
            <span slot="title">新试题题库</span>
          </template>
            <el-menu-item index="2-1" @click="gothesub">主观题</el-menu-item>
            <el-menu-item index="2-2" @click="gotheobj">客观题</el-menu-item>
            <el-menu-item index="2-3" @click="gotheimg">图像题</el-menu-item>
            <el-menu-item index="2-4" @click="gothevoice">音频题</el-menu-item>
            <el-menu-item index="2-5" @click="gothetext">视频题</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-folder"></i>
          <span slot="title" @click="gotheexcel">Excel 管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-document"></i>
          <span slot="title" @click="gothelog">日志记录</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title" @click="gothepower">权限管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧主体区域 -->
    <el-main>
      <!-- 路由占位符 -->
      <router-view></router-view>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  created () {
    this.token = sessionStorage.getItem('token')
  },
  mounted () {
    this.$axios({
      method: 'get',
      url: '/profile',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer ' + this.token
      }
    }).then((res) => {
      this.name = res.data.username
    })
  },
  methods: {
    gothehome () {
      this.$router.push('/home')
    },
    gothesub () {
      this.$router.push('/subjective')
    },
    gotheobj () {
      this.$router.push('/objective')
    },
    gothetext () {
      this.$router.push('/text')
    },
    gotheimg () {
      this.$router.push('/img')
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.$message('退出成功')
    },
    gothevoice () {
      this.$router.push('/voice')
    },
    gothelog () {
      this.$router.push('/logger')
    },
    gothepower () {
      if (this.name === 'admin') {
        this.$router.push('/power')
      } else {
        this.$router.push('/powerless')
      }
    },
    gotheexcel () {
      this.$router.push('/excel')
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
    .el-menu {
      border-right: none;
    }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-main {
  background-color: #eaedf1;
}
</style>
