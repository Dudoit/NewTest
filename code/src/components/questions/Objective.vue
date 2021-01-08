<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 有点bug，暂时搁置，一、handleChange无法拿到参数，二、点击分页会重置为位查找状态 -->
      <!-- 解决思路：让handleChange事件里面调用params函数 -->
      <!-- <template>
        <el-select v-model="selectedClassify" placeholder="请选择试题分类" @change="handleChange">
          <el-option v-for="item in classifylist" :key="item.value"
          :label="item.classify" :value="item.value">
          </el-option>
        </el-select>
      </template> -->
      <!-- 以下为替换方案 不太美观 -->
      <!-- <el-button type="success" @click="getParamsData('1')">马原</el-button> -->
      <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
      <!--  -->
      <el-table :data="objtest" height="504px" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="title" label="题目" width="250px" :show-overflow-tooltip = "true"></el-table-column>
        <el-table-column prop="classify" label="分类" width="80px" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.classify === '0'">毛中特</el-tag>
            <el-tag type="success" v-else-if="scope.row.classify === '1'">马原</el-tag>
            <el-tag type="warning" v-else-if="scope.row.classify === '2'">思修</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="optiona" label="选项A" :show-overflow-tooltip = "true"></el-table-column>
        <el-table-column prop="optionb" label="选项B" :show-overflow-tooltip = "true"></el-table-column>
        <el-table-column prop="optionc" label="选项C" :show-overflow-tooltip = "true"></el-table-column>
        <el-table-column prop="answer" label="答案" align="center" width="80px"></el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showUpdateById(scope.row._id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row._id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination layout="prev, pager, next" background @size-change="handleSizeChange" :page-size="queryInfo.pagesize"
        @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :total="queryInfo.total">
        </el-pagination>
      </div>
    </el-card>

    <!-- 弹框区域 -->
    <!-- 新增试题 -->
    <el-dialog title="新增试题" :visible.sync="addDialogVisible" @close="addDialogClose" width="50%">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="试题" prop="title">
          <el-input v-model="addForm.title" placeholder="试题题目"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="classify">
          <el-select v-model="addForm.classify" placeholder="选择分类" style="width:100%">
            <el-option label="毛中特" value="0"></el-option>
            <el-option label="马原" value="1"></el-option>
            <el-option label="思修" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选项A" prop="optiona">
          <el-input v-model="addForm.optiona"></el-input>
        </el-form-item>
        <el-form-item label="选项B" prop="optionb">
          <el-input v-model="addForm.optionb"></el-input>
        </el-form-item>
        <el-form-item label="选项C" prop="optionc">
          <el-input v-model="addForm.optionc"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer">
          <el-input v-model="addForm.answer"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTest">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改试题 -->
    <el-dialog title="修改试题" :visible.sync="updateDialogVisible" width="30%">
      <!-- 添加参数  -->
      <el-form :model="item" v-for="(item,index) in updatelist" :key="index" :rules="updateFormRules" ref="updateFormRef" label-width="100px">
        <el-form-item label="修改试题" prop="title">
          <el-input v-model="item.title" :disabled = true></el-input>
        </el-form-item>
        <el-form-item label="修改分类" prop="classify">
          <el-select v-model="item.classify" placeholder="考点分类" style="width:100%">
            <el-option label="毛中特" value="0"></el-option>
            <el-option label="马原" value="1"></el-option>
            <el-option label="思修" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改选项A" prop="optiona">
          <el-input v-model="item.optiona"></el-input>
        </el-form-item>
        <el-form-item label="修改选项B" prop="optionb">
          <el-input v-model="item.optionb"></el-input>
        </el-form-item>
        <el-form-item label="修改选项C" prop="optionc">
          <el-input v-model="item.optionc"></el-input>
        </el-form-item>
        <el-form-item label="修改答案" prop="answer">
          <el-input v-model="item.answer"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" v-for="(item,index) in updatelist" :key="index" @click="updateParams(index)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      queryInfo: {
        pagenum: 1,
        pagesize: 8,
        total: 12
      },
      // // 选择分类
      // selectedClassify: [],
      // classifylist: [
      //   { value: 0, label: '毛中特' },
      //   { value: 1, label: '马原' },
      //   { value: 2, label: '思修' }
      // ],
      objtest: [],
      addDialogVisible: false,
      addForm: {
        title: '',
        classify: '',
        optiona: '',
        optionb: '',
        optionc: '',
        answer: ''
      },
      addFormRules: {
        title: [
          { required: true, message: '请输入试题', trigger: 'blur' }
        ]
      },
      updateDialogVisible: false,
      updatelist: {},
      updateFormRules: {
        classify: [
          { message: '请选择分类', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getObjTest()
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
    // handleChange () {
    //   this.getParamsData()
    // },
    // getParamsData () {
    //   this.$axios({
    //     method: 'get',
    //     url: '/obj'
    //   }).then(res => {
    //     if (res.status !== 200) {
    //       return this.$message.error('获取客观题列表失败')
    //     }
    //     // let arr = []
    //     // arr = res.data.splice((this.queryInfo.pagenum - 1) * this.queryInfo.pagesize, this.queryInfo.pagenum * this.queryInfo.pagesize)
    //     // this.objtest = arr
    //     let select = []
    //     select = res.data.filter(item => item.classify === '0')
    //     this.objtest = select
    //   })
    // },
    // getParamsData (value) {
    //   this.$axios({
    //     method: 'get',
    //     url: '/obj'
    //   }).then(res => {
    //     if (res.status !== 200) {
    //       return this.$message.error('获取客观题列表失败')
    //     }
    //     // let arr = []
    //     // arr = res.data.splice((this.queryInfo.pagenum - 1) * this.queryInfo.pagesize, this.queryInfo.pagenum * this.queryInfo.pagesize)
    //     // this.objtest = arr
    //     let select = []
    //     select = res.data.filter(item => item.classify === value)
    //     this.objtest = select
    //   })
    // },
    getObjTest () {
      this.$axios({
        method: 'get',
        url: '/obj'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error('获取客观题列表失败')
        }
        // this.$message.success('获取客观题列表成功!')
        this.queryInfo.total = res.data.length
        let arr = []
        arr = res.data.splice((this.queryInfo.pagenum - 1) * this.queryInfo.pagesize, this.queryInfo.pagenum * this.queryInfo.pagesize)
        this.objtest = arr
      })
    },
    addTest () {
      this.$axios({
        method: 'post',
        url: '/obj/new',
        data: {
          title: this.addForm.title,
          classify: this.addForm.classify,
          optiona: this.addForm.optiona,
          optionb: this.addForm.optionb,
          optionc: this.addForm.optionc,
          answer: this.addForm.answer
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('新增试题失败')
        }
        this.$message.success('新增试题成功🎉')
        this.getObjTest()
        this.addDialogVisible = false
      })
      this.$axios({
        method: 'post',
        url: '/logger/new',
        data: {
          username: this.name,
          handle: '新增',
          test: this.addForm.title
        }
      }).then((res) => {
        console.log('日志记录已更新')
      })
    },
    addDialogClose () {
      this.$refs.addFormRef.resetFields()
    },
    showUpdateById (id) {
      this.$axios({
        method: 'get',
        url: '/obj'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error('获取试题列表失败')
        }
        let arr = []
        arr = res.data
        this.updatelist = arr.filter(item => item._id === id)
        this.updateDialogVisible = true
      })
    },
    updateParams (index) {
      this.$axios({
        method: 'post',
        url: '/obj/edit',
        data: {
          _id: this.updatelist[index]._id,
          classify: this.updatelist[index].classify,
          optiona: this.updatelist[index].optiona,
          optionb: this.updatelist[index].optionb,
          optionc: this.updatelist[index].optionc,
          answer: this.updatelist[index].answer
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('更新试题失败')
        }
        this.$message.success('更新试题成功🎉')
        this.getObjTest()
        this.updateDialogVisible = false
      })
      this.$axios({
        method: 'post',
        url: '/logger/new',
        data: {
          username: this.name,
          handle: '修改',
          test: this.updatelist[index].title
        }
      }).then((res) => {
        console.log('日志记录已更新')
      })
    },
    removeById (id) {
      this.$axios({
        method: 'post',
        url: '/obj/delete',
        data: {
          _id: id
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('删除试题失败')
        }
        this.$message.success('删除试题成功💨')
        this.getObjTest()
      })
      this.$axios({
        method: 'post',
        url: '/logger/new',
        data: {
          username: this.name,
          handle: '删除',
          test: this.objtest.filter(item => item._id === id)[0].title
        }
      }).then((res) => {
        console.log('日志记录已更新')
      })
    },
    // 分页
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getObjTest()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getObjTest()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
