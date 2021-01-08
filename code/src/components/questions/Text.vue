<template>
  <div>
    <el-card>
      <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
      <!--  -->
      <el-table :data="videotest" height="504px" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="classify" label="分类" width="80px" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.classify === '常识'">常识</el-tag>
            <el-tag type="success" v-else-if="scope.row.classify === '1'">马原</el-tag>
            <el-tag type="warning" v-else-if="scope.row.classify === '2'">思修</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="coverpic" label="封面图" width="130px" align="center">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.coverpic" fit="cover"></el-image>
          </template>
        </el-table-column>
        <!-- 视频区 -->
        <el-table-column prop="video" label="视频" align="center">
            <template slot-scope="scope">
              <div class="video-area" v-html="scope.row.video"></div>
            </template>
        </el-table-column>
        <el-table-column prop="answer" label="答案" align="center" width="200px"></el-table-column>
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
        <el-form-item label="封面图" prop="coverpic">
          <el-input v-model="addForm.coverpic"></el-input>
        </el-form-item>
        <el-form-item label="视频" prop="video">
          <el-input v-model="addForm.video"></el-input>
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
        <el-form-item label="修改封面图" prop="coverpic">
          <el-input v-model="item.coverpic"></el-input>
        </el-form-item>
        <el-form-item label="修改视频" prop="video">
          <el-input v-model="item.video"></el-input>
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
      videotest: [
        { title: '测试，听首歌吧（Tip: 需要联网 🌐）', coverpic: 'https://cdn.jsdelivr.net/gh/Dudoit/GraduationProjectAssets@1.0/%E4%B8%80%E8%B7%AF%E5%90%91%E5%8C%97.jpg', video: '<iframe src="https://player.bilibili.com/player.html?aid=626824004&bvid=BV1dt4y1U7zA&cid=228233020&page=1&high_quality=1&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>' }
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
    this.getVideotest()
  },
  methods: {
    getVideotest () {
      this.$axios({
        method: 'get',
        url: '/video'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error('获取视频题列表失败')
        }
        this.videotest = res.data
      })
    },
    addTest () {
      this.$axios({
        method: 'post',
        url: '/video/new',
        data: {
          title: this.addForm.title,
          classify: this.addForm.classify,
          coverpic: this.addForm.coverpic,
          video: this.addForm.video,
          answer: this.addForm.answer
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('新增试题失败')
        }
        this.$message.success('新增试题成功🎉')
        this.getVideotest()
        this.addDialogVisible = false
      })
    },
    addDialogClose () {
      this.$refs.addFormRef.resetFields()
    },
    showUpdateById (id) {
      this.$axios({
        method: 'get',
        url: '/video'
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
        url: '/video/edit',
        data: {
          _id: this.updatelist[index]._id,
          classify: this.updatelist[index].classify,
          coverpic: this.updatelist[index].coverpic,
          video: this.updatelist[index].video,
          answer: this.updatelist[index].answer
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('更新试题失败')
        }
        this.$message.success('更新试题成功🎉')
        this.getVideotest()
        this.updateDialogVisible = false
      })
    },
    removeById (id) {
      this.$axios({
        method: 'post',
        url: '/video/delete',
        data: {
          _id: id
        }
      }).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('删除试题失败')
        }
        this.$message.success('删除试题成功💨')
        this.getVideotest()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
