<template>
  <div>
    <div class="aside">
      <el-aside class="topaside" width="400px">
        <el-card>
          <div class="userinfo">
            <img src="../assets/naruto.gif" alt="" class="user-avator">
            <div class="userinfocont">
              <div class="userinfoname">{{name}}</div>
                <div v-if="this.name === 'admin'">超级管理员</div>
                <div v-else>管理员</div>
            </div>
          </div>
          <div class="userinfolist">
            您的邮箱：
            <span>{{email}}</span>
          </div>
          <div class="userinfolist">
            加入时间：
            <span>{{createdtime | dateFormat}}</span>
          </div>
        </el-card>
      </el-aside>
      <el-aside class="timeaside" width="400px">
        <el-card>
          {{timenow}}
        </el-card>
      </el-aside>
      <!-- echars 图表 -->
      <el-aside class="bottomaside" width="400px">
        <el-card>
          <div id="main" style="width: 360px;height:240px;"></div>
        </el-card>
      </el-aside>
    </div>
    <div class="main">
      <div class="maintop">
        <div class="topcard">
          <el-card style="padding: 0">
            <div class="cardbody">
              <div class="body-content">
                <i class="el-icon-box"></i>
                <div class="content-right">
                  <div class="right-num">{{totaltest}}</div>
                  <div>题目总数量</div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div class="topcard">
          <el-card style="padding: 0">
            <div class="cardbody">
              <div class="body-content">
                <i class="el-icon-user" style="background: #64d572"></i>
                <div class="content-right">
                  <div class="right-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div class="topcard">
          <el-card style="padding: 0">
            <div class="cardbody">
              <div class="body-content">
                <i class="el-icon-chat-dot-round" style="background: #f25e43"></i>
                <div class="content-right">
                  <div class="right-num">{{loggernum}}</div>
                  <div>日志消息</div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="mainbottom">
        <el-card>
          <div class="header">
            <div class="header-content">
              <div class="hc-title">每日一练</div>
              <div class="hc-add">添加</div>
            </div>
          </div>
          <div class="mb-main">
            <template>
              <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
              style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="日期" width="120">
                  <template>{{ yearDate }}</template>
                </el-table-column>
                <el-table-column prop="classify" label="分类" width="120">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.classify === '0'">毛中特</el-tag>
                    <el-tag v-else-if="scope.row.classify === '常识'">常识</el-tag>
                    <el-tag type="success" v-else-if="scope.row.classify === '1'">马原</el-tag>
                    <el-tag type="warning" v-else-if="scope.row.classify === '2'">思修</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="title" label="题目" show-overflow-tooltip></el-table-column>
              </el-table>
            </template>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      name: '',
      email: '',
      createdtime: '',
      nowtime: new Date(),
      objtest: 0,
      subtest: 0,
      imgtest: 0,
      videotest: 0,
      voicetest: 0,
      totaltest: 0,
      loggernum: 0,
      token: '',
      tableData: [],
      timenow: ''
    }
  },
  created () {
    this.token = sessionStorage.getItem('token')
  },
  mounted () {
    // 获取 当前登陆用户信息 区域
    this.$axios({
      method: 'get',
      url: '/profile',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // 把token放到请求头才能请求，这里的'Bearer '表示是后台希望更加的安全，依据后台给的信息看到底是加还是不加
        Authorization: 'Bearer ' + this.token
      }
    }).then((res) => {
      if (res.status !== 200) {
        return this.$message.error('注册用户失败')
      }
      this.name = res.data.username
      this.email = res.data.email
      this.createdtime = res.data.created_time
    })

    // echarts 区域
    const myChart = echarts.init(document.getElementById('main'))
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        top: 'bottom',
        data: ['主观', '客观', '图像', '音频', '视频']
      },
      series: [
        {
          name: '试题数量',
          type: 'pie',
          radius: [30, 110],
          center: ['50%', '46%'],
          roseType: 'area',
          labelLine: {
            normal: {
              length: 5
            }
          },
          color: ['#8378EA', '#32C5E9', '#AEFDCA', '#FFDB5C', '#FF9F7F'],
          data: [
            { value: 10, name: '主观' },
            { value: 5, name: '客观' },
            { value: 15, name: '图像' },
            { value: 25, name: '音频' },
            { value: 20, name: '视频' }
          ]
        }
      ]
    }
    myChart.setOption(option)

    // 获取 主观题 信息区域
    this.$axios({
      method: 'get',
      url: '/students'
    }).then(res => {
      this.subtest = res.data.length
      that.getRandomtest(res.data)
    })
    const that = this
    // 获取 客观题 信息区域
    this.$axios({
      method: 'get',
      url: '/obj'
    }).then(res => {
      this.objtest = res.data.length
      that.getRandomtest(res.data)
    })

    // 获取 图像题 信息区域
    this.$axios({
      method: 'get',
      url: '/img'
    }).then(res => {
      this.imgtest = res.data.length
      that.getRandomtest(res.data)
    })

    // 获取 音频题 信息区域
    this.$axios({
      method: 'get',
      url: '/voice'
    }).then(res => {
      this.voicetest = res.data.length
      that.getRandomtest(res.data)
    })
    // 获取 视频题 信息区域
    this.$axios({
      method: 'get',
      url: '/video'
    }).then(res => {
      this.videotest = res.data.length
      that.getRandomtest(res.data)
      this.totaltest = this.objtest + this.subtest + this.imgtest + this.voicetest + this.videotest
    })
    // 获取 日志消息 信息区域
    this.$axios({
      method: 'get',
      url: '/logger'
    }).then(res => {
      if (res.status !== 200) {
        return this.$message.error('获取日志记录失败')
      }
      this.loggernum = res.data.length
    })

    // 时间
    // this.timea = that.now()
    setInterval(geTtime, 1000)
    function geTtime () {
      const nowtime = new Date()
      const year = nowtime.getFullYear()
      const month = nowtime.getMonth() + 1
      const data = nowtime.getDate()
      const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const day = nowtime.getDay()
      let hour = nowtime.getHours()
      hour = hour < 10 ? '0' + hour : hour
      let minutes = nowtime.getMinutes()
      minutes = minutes < 10 ? '0' + minutes : minutes
      let seconds = nowtime.getSeconds()
      seconds = seconds < 10 ? '0' + seconds : seconds
      that.timenow = year + '年' + month + '月' + data + '日 ' + arr[day] + '  ' + hour + ':' + minutes + ':' + seconds
    }
    geTtime()
  },
  methods: {
    getRandomtest (data) {
      const test = data
      const randomnum = Math.floor(Math.random() * data.length)
      const randomtest = test[randomnum]
      this.tableData.push(randomtest)
    }
  },
  computed: {
    time: function () {
      const date = new Date()
      const h = date.getHours()
      if (h < 11) {
        return '早安啊'
      } else if (h < 17) {
        return '午安'
      } else {
        return '晚上好'
      }
    },
    yearDate: function () {
      const year = new Date().getFullYear()
      const month = new Date().getMonth()
      const day = new Date().getDate()
      return year + '-' + (month + 1) + '-' + day
    }
  }
}
</script>

<style lang="less">
.aside {
  float: left;
  margin-right: 10px;
  .topaside {
    height: 255px;
  }
  .timeaside {
    margin-top: 20px;
  }
  .bottomaside {
    margin-top: 20px;
    height: 290px;
  }
}

.userinfo {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .userinfocont {
    padding-left: 50px;
    text-align: left;
    flex: 1;
    font-size: 14px;
    color: #999;
    .userinfoname {
      font-size: 30px;
      color: #222;
    }
  }
}
.userinfolist {
  font-size: 14px;
  color: #999;
  line-height: 25px;
  text-align: left;
  span {
    margin-left: 70px;
  }
}

.main {
  width: 850px;
  float: left;
}
.maintop {
  width: 850px;
  display: flex;
}
.topcard {
  width: 33.33333%;
  float: left;
  padding-left: 10px;
  padding-right: 10px;
  .el-card {
    border: 0px;
  }
  .el-card__body {
    padding: 0 0 0 0;
  }
}
.cardbody {
  padding: 0;
  .body-content {
    display: flex;
    position: relative;
    align-items: center;
    height: 100px;
    i {
      width: 100px;
      height: 100px;
      margin: 0;
      padding: 0;
      background-color: #2d8cf0;
    }
    .el-icon-box::before {
      content: '\e74b';
      position: absolute;
      top: 17px;
      left: 17px;
      font-size: 66px;
      color: white;
      font-family:element-icons!important;
    }
    .el-icon-chat-dot-round::before {
      content: '\e72f';
      position: absolute;
      top: 17px;
      left: 17px;
      font-size: 66px;
      color: white;
      font-family:element-icons!important;
    }
    .el-icon-user::before {
      content: '\e6e3';
      position: absolute;
      top: 17px;
      left: 17px;
      font-size: 66px;
      color: white;
      font-family:element-icons!important;
    }
    .content-right {
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: #999;
      .right-num {
        color: #2d8cf0;
        font-size: 30px;
        font-weight: 700;
      }
      div {
        text-align: center;
        font-size: 14px;
        color: #999;
      }
    }
  }
}

.mainbottom {
  width: 830px;
  margin: 20px 0 0 10px;
  .el-card__body {
    padding: 0 0 0 0;
  }
  .header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    .header-content {
      height: 20px;
      .hc-title {
        float: left;
      }
      .hc-add {
        float: right;
      }
    }
  }
  .mb-main {
    padding: 0 20px 10px 20px;
  }
}
</style>
