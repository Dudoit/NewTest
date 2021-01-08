<template>
  <div>
    <el-card>
      <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
      <!--  -->
      <el-table :data="voicetest" height="504px" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="classify" label="分类" align="center" width="80px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.classify === '常识'">常识</el-tag>
            <el-tag type="success" v-else-if="scope.row.classify === '1'">马原</el-tag>
            <el-tag type="warning" v-else-if="scope.row.classify === '2'">思修</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="voice" label="音频" align="center" width="320px">
          <template slot-scope="scope">
            <div class="video-area" v-html="scope.row.voice"></div>
          </template>
        </el-table-column>
        <el-table-column prop="describe" label="音频描述" :show-overflow-tooltip = "true" width="150px" align="center"></el-table-column>
        <el-table-column prop="answer" label="答案" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showUpdateById(scope.row._id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row._id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
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
            <el-option label="常识" value="常识"></el-option>
            <el-option label="马原" value="1"></el-option>
            <el-option label="思修" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="音频" prop="voice">
          <el-input v-model="addForm.voice"></el-input>
        </el-form-item>
        <el-form-item label="音频描述" prop="describe">
          <el-input v-model="addForm.describe"></el-input>
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
            <el-option label="常识" value="常识"></el-option>
            <el-option label="马原" value="1"></el-option>
            <el-option label="思修" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="音频" prop="voice">
          <el-input v-model="item.voice"></el-input>
        </el-form-item>
        <el-form-item label="音频描述" prop="describe">
          <el-input v-model="item.describe"></el-input>
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
      voicetest: [
        { title: '嘻嘻', classify: '常识', voice: '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=300 height=86 src="//music.163.com/outchain/player?type=2&id=1804879213&auto=0&height=66"></iframe>' }
      ],
      addDialogVisible: false,
      addForm: {},
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
    this.getVoicetest()
  },
  methods: {
    getVoicetest () {
      this.$axios({
        method: 'get',
        url: '/voice'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error('获取音频题列表失败')
        }
        this.voicetest = res.data
      })
    },
    addTest () {
      this.$axios({
        method: 'post',
        url: '/voice/new',
        data: {
          title: this.addForm.title,
          classify: this.addForm.classify,
          voice: this.addForm.voice,
          describe: this.addForm.describe,
          answer: this.addForm.answer
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('新增试题失败')
        }
        this.$message.success('新增试题成功🎉')
        this.getVoicetest()
        this.addDialogVisible = false
      })
    },
    addDialogClose () {
      this.$refs.addFormRef.resetFields()
    },
    showUpdateById (id) {
      this.$axios({
        method: 'get',
        url: '/voice'
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
        url: '/voice/edit',
        data: {
          _id: this.updatelist[index]._id,
          classify: this.updatelist[index].classify,
          voice: this.updatelist[index].voice,
          describe: this.updatelist[index].describe,
          answer: this.updatelist[index].answer
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('更新试题失败')
        }
        this.$message.success('更新试题成功🎉')
        this.getVoicetest()
        this.updateDialogVisible = false
      })
    },
    removeById (id) {
      this.$axios({
        method: 'post',
        url: '/voice/delete',
        data: {
          _id: id
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('删除试题失败')
        }
        this.$message.success('删除试题成功💨')
        this.getVoicetest()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
