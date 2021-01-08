<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="userlist" height="504px" border style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showUpdateById(scope.row._id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row._id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改用户信息 -->
    <el-dialog title="修改管理员信息" :visible.sync="updateDialogVisible" width="30%">
      <!-- 添加参数  -->
      <el-form :model="item" v-for="(item,index) in updatelist" :key="index" :rules="updateFormRules" ref="updateFormRef" label-width="100px">
        <el-form-item label="修改用户名" prop="username">
          <el-input v-model="item.username"></el-input>
        </el-form-item>
        <el-form-item label="修改邮箱" prop="email">
          <el-input v-model="item.email"></el-input>
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
      userlist: [],
      updatelist: [],
      updateDialogVisible: false
    }
  },
  created () {
    this.getUserlist()
  },
  methods: {
    getUserlist () {
      this.$axios({
        method: 'get',
        url: '/user'
      }).then((res) => {
        this.userlist = res.data
      })
    },
    showUpdateById (id) {
      this.$axios({
        method: 'get',
        url: '/user'
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
        url: '/user/edit',
        data: {
          _id: this.updatelist[index]._id,
          username: this.updatelist[index].username,
          email: this.updatelist[index].email
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('更新用户信息失败')
        }
        this.$message.success('更新用户信息成功🛴')
        this.getUserlist()
        this.updateDialogVisible = false
      })
    },
    removeById (id) {
      this.$axios({
        method: 'post',
        url: '/user/delete',
        data: {
          _id: id
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('删除用户失败')
        }
        this.$message.success('删除用户成功💨')
        this.getUserlist()
      })
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>

<style lang="less">
.el-table .success-row {
  background: #f0f9eb
}
</style>
