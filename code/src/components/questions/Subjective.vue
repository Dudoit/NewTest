<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!--  -->
      <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
      <el-table :data="studentslist" height="250" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="hobbies" label="爱好"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showUpdateById(scope.row._id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row._id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--  -->
    <el-dialog title="修改" :visible.sync="updateDialogVisible" width="30%">
      <!-- 添加参数  -->
      <el-form :model="item" v-for="(item,index) in updatelist" :key="index" :rules="updateFormRules" ref="updateFormRef" label-width="100px">
        <el-form-item label="修改姓名" prop="name">
          <el-input v-model="item.name"></el-input>
        </el-form-item>
        <el-form-item label="修改年龄" prop="age">
          <el-input v-model="item.age"></el-input>
        </el-form-item>
        <el-form-item label="修改爱好" prop="hobbies">
          <el-input v-model="item.hobbies"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" v-for="(item,index) in updatelist" :key="index" @click="updateParams(index)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" @close="addDialogClose" width="50%">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addForm.age"></el-input>
        </el-form-item>
        <el-form-item label="爱好" prop="hobbies">
          <el-input v-model="addForm.hobbies"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      studentslist: [],
      updateDialogVisible: false,
      updatelist: {},
      updateFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      addDialogVisible: false,
      addForm: {
        name: '',
        age: '',
        hobbies: ''
      },
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 7, message: '用户名长度在2~7个字符之间', trigger: 'blur' }
        ],
        age: [
          { required: false, message: '年龄', trigger: 'blur' }
        ],
        hobbies: [
          { required: false, message: '爱好', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getStudentsList()
  },
  methods: {
    // async getStudentsList () {
    //   const { data: res } = await this.$axios.get('/students')
    //   if (res.status !== 200) {
    //     return this.$message.error('获取学生列表失败')
    //   }
    //   this.$message.success('获取学生列表成功!')
    //   this.studentslist = res.data
    // }
    getStudentsList () {
      this.$axios({
        method: 'get',
        url: '/students'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error('获取学生列表失败')
        }
        this.$message.success('获取学生列表成功!')
        this.studentslist = res.data
      })
    },
    removeById (id) {
      this.$axios({
        method: 'post',
        url: '/students/delete',
        data: {
          _id: id
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('删除学生失败')
        }
        this.$message.success('删除学生成功!')
        this.getStudentsList()
      })
    },
    showUpdateById (id) {
      this.$axios({
        method: 'get',
        url: '/students'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error('获取学生列表失败')
        }
        let arr = []
        arr = res.data
        this.updatelist = arr.filter(item => item._id === id)
        // this.updatelist = res.data
        this.updateDialogVisible = true
        // console.log(arr.filter(item => item._id === id))
      })
    },
    // 监听对话框的关闭事件，关闭时重置表单验证规则
    // updateDialogClosed () {
    //   this.$refs.updateFormRef.resetFields()
    // },
    updateParams (index) {
      this.$axios({
        method: 'post',
        url: '/students/edit',
        data: {
          _id: this.updatelist[index]._id,
          name: this.updatelist[index].name,
          age: this.updatelist[index].age,
          hobbies: this.updatelist[index].hobbies
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('修改姓名失败')
        }
        this.$message.success('修改姓名成功!')
        this.getStudentsList()
        this.updateDialogVisible = false
      })
    },
    addStudent () {
      this.$axios({
        method: 'post',
        url: '/students/new',
        data: {
          name: this.addForm.name,
          age: this.addForm.age,
          hobbies: this.addForm.hobbies
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('添加学生失败')
        }
        this.$message.success('添加学生成功')
        this.getStudentsList()
        this.addDialogVisible = false
      })
    },
    addDialogClose () {
      this.$refs.addFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
