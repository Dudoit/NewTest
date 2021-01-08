<template>
  <div>
    <el-alert title="此处只记录了题库中客观题的日志处理数据 📑" type="warning" show-icon :closable="false"></el-alert>
    <el-alert v-for="item in info" :key="item._id" :title="geTtime(item.time) + ' ' + item.username + ' ' + item.handle + '了题目：' + item.test"
    type="success" show-icon class="alert" @close="removelogger(item._id)"></el-alert>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: [
        { username: 'abc,', time: '2020-12-22,', handle: 'doing something', test: ' xxx' },
        { username: 'pdd,', time: '2020-12-22,', handle: 'doing something', test: ' xxx' }
      ]
    }
  },
  mounted () {
    this.$axios({
      method: 'get',
      url: '/logger'
    }).then(res => {
      if (res.status !== 200) {
        return this.$message.error('获取日志记录失败')
      }
      this.info = res.data
    })
  },
  methods: {
    geTtime (time) {
      const nowtime = new Date(time)
      const year = nowtime.getFullYear()
      const month = nowtime.getMonth() + 1
      const data = nowtime.getDate()
      let hour = nowtime.getHours()
      hour = hour < 10 ? '0' + hour : hour
      let minutes = nowtime.getMinutes()
      minutes = minutes < 10 ? '0' + minutes : minutes
      let seconds = nowtime.getSeconds()
      seconds = seconds < 10 ? '0' + seconds : seconds
      return year + '年' + month + '月' + data + '日 ' + '  ' + hour + ':' + minutes + ':' + seconds
    },
    removelogger (id) {
      this.$axios({
        method: 'post',
        url: '/logger/delete',
        data: {
          _id: id
        }
      }).then((res) => {})
    }
  }
}
</script>

<style lang="less" scoped>
.alert {
  margin-top: 5px;
}
</style>
