<template>
  <div>
    <el-card>
      <div class="errPage-container">
        <div class="content">
          <div class="content-left">
            <h1> Oops! </h1>
            <h2>抱歉，您暂时没有权限去该页面</h2>
            <h6>申请权限，请发送邮件到1551362082@qq.com</h6>
          </div>
          <div class="content-right">
            <img src="https://panjiachen.gitee.io/vue-element-admin/static/img/401.089007e7.gif?1608636885902" alt="">
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.content {
  .content-left {
    width: 50%;
    float: left;
    h1 {
      font-size: 60px;
      color: #484848;
    }
  }
  .content-right {
    width: 50%;
    float: left;
  }
}
</style>
