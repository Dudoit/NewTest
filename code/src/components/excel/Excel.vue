<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- <el-button type="primary" @click="addDialogVisible = true">添加</el-button> -->
      <el-alert title="您可以上传本地的 Excel 文件到数据库中 [ 需要注意标头模型是否一致 ] 📦" type="warning" show-icon></el-alert>
      <el-alert title="Tip: 在根目录中为您提供了测试文件,祝您使用愉快! [ 可以参照此格式定义您的Excel ] 📑" type="warning" show-icon class="alerttwo"></el-alert>
      <div class="top">
        <input type="file" name="file" accept="file" @change="uploadAvatar" class="uploadfile">
      </div>
      <el-button type="primary" size="mini" @click="saveToDatabase()">将Excel表格文件数据存储到数据库</el-button>
      <el-button type="success" size="mini" @click="getTableData()" class="renderfrom">渲染表单</el-button>
      <template>
        <download-excel class = "export-excel-wrapper" :data = "exceltest" :fields = "json_fields"
        title="新试题系统 Excel 导出试题" name = "Excel导出试题.xls">
          <el-button type="warning" size="mini" style="position: absolute;" class="exportexcel">导出EXCEL</el-button>
        </download-excel>
      </template>
      <!--  -->
      <el-table :data="exceltest" height="504px" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="title" label="题目" width="250px" :show-overflow-tooltip = "true"></el-table-column>
        <el-table-column prop="classify" label="分类" width="80px" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.classify === '数学'">数学</el-tag>
            <el-tag type="success" v-else-if="scope.row.classify === '英语'">英语</el-tag>
            <el-tag type="warning" v-else-if="scope.row.classify === '语文'">语文</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="optiona" label="选项A" :show-overflow-tooltip = "true"></el-table-column>
        <el-table-column prop="optionb" label="选项B" :show-overflow-tooltip = "true"></el-table-column>
        <el-table-column prop="answer" label="答案" align="center" width="150px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      exceltest: [],
      json_fields: {
        Id: '_id',
        题目: 'title',
        分类: 'classify',
        选项A: 'optiona',
        选项B: 'optionb',
        答案: 'answer'
      },
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf- 8'
          }
        ]
      ]
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    uploadAvatar (avatar) {
      const file = avatar.target.files[0]
      const data = new FormData()
      data.append('file', file, file.name)
      data.append('data', 112)
      this.$axios.post('/upload', data).then(function (data) {
      }, function (response) {
      })
    },
    saveToDatabase () {
      this.$axios({
        method: 'post',
        url: '/excel/uploads'
      }).then(res => {
        this.$message.success('Excel 表单数据保存成功 🎉')
      })
    },
    getTableData () {
      this.$axios({
        method: 'get',
        url: '/excel'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error('获取excel列表失败')
        }
        this.exceltest = res.data
        this.$message.success('表单数据已渲染到页面啦 🎉')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.alerttwo {
  margin-top: 5px!important;
  margin-bottom: 10px;
}

.top {
  position: relative;
  .uploadfile {
    position: absolute;
    left: 15px;
  }
}

.renderfrom {
  margin-right: -700px;
}

.export-excel-wrapper {
  position: absolute;
  .exportexcel {
    position: absolute;
    left: 1140px;
    bottom: 0;
  }
}
// .filea {
//   position: relative;
//   display: inline-block;
//   background: #D0EEFF;
//   border: 1px solid #99D3F5;
//   border-radius: 4px;
//   padding: 4px 12px;
//   overflow: hidden;
//   color: #1E88C7;
//   text-decoration: none;
//   text-indent: 0;
//   line-height: 20px;
// }
// .filea input {
//   position: absolute;
//   overflow: hidden;
//   right: 0;
//   top: 0;
//   opacity: 0;
// }
// .filea:hover {
//   background: #AADFFD;
//   border-color: #78C3F3;
//   color: #004974;
//   text-decoration: none;
// }
</style>
