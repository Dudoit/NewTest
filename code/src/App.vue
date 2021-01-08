<template>
  <div id="app">
    <router-view></router-view>
  <!-- <el-button type="success" @click="getData()">查询数据</el-button>
  <el-button type="success" @click="addData()">插入数据</el-button>
  <el-button type="success" @click="delData()">删除数据</el-button>
  <el-button type="success" @click="upData()">修改数据</el-button> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted: function () {
    // this.$axios({
    //   method: 'get',
    //   url: '/'
    // }).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    addData () {
      this.$axios({
        method: 'post',
        url: '/students/new',
        data: {
          name: 'xiaohei',
          age: 500
        }
      }).then((res) => {
        console.log(res)
      })
    },
    getData () {
      this.$axios({
        method: 'get',
        url: '/students'
      }).then(res => {
        console.log(res)
      })
    },
    delData () {
      this.$axios({
        method: 'post',
        url: '/students/delete',
        data: {
          _id: '5fcf6537b01d8842f8df212e'
        }
      }).then((res) => {
        console.log(res)
      })
    },
    upData () {
      this.$axios({
        method: 'post',
        url: '/students/edit',
        data: {
          _id: '5fcf6525b01d8842f8df212d',
          name: 'xiaohei'
        }
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
