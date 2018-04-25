<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>部门列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="_add">新增部门</el-button>
      </div>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>
    </el-card>

    <el-dialog title="部门管理" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="padding-right:30%;">
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <el-cascader
            v-model="cascaderSelectArr"
            :options="selectDept"
            :props="defaultProps"
            node-key="id"
            :change-on-select="true"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="展示顺序" :label-width="formLabelWidth">
          <el-input v-model="form.seq" placeholder="请输入展示顺序"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" type="textarea" :row="2" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getDeptTree, saveDept, delDept} from 'api/dept.js'

  export default {
    data () {
      return {
        data: [], //  部门树数据
        defaultProps: {
          children: 'deptList',
          label: 'name',
          value: 'id'
        },
        dialogFormVisible: false,
        form: {
          id: '',
          name: '',
          parentId: '',
          seq: '',
          remark: ''
        },
        cascaderSelectArr: [0],
        formLabelWidth: '120px'
      }
    },
    computed: {
      selectDept () {
        var newArr = [{
          name: '我就是初始部门.',
          id: 0
        }].concat(this.data)
        return newArr
      }
    },
    watch: {
    },
    methods: {
      handleNodeClick (data) {
        // console.log(data)
      },
      submit () {
        //  这里因为控件返回的是选择数据的数组，取最后一个就好
        this.form.parentId = this.cascaderSelectArr[this.cascaderSelectArr.length - 1]
        saveDept(this.form).then((res) => {
          if (res.ret) {
            this.$message.success(res.msg)
            this._getDeptData()
          } else {
            this.$message.error('保存出现了一个问题。')
            console.log(res.msg)
          }
        }).catch((e) => {
          this.$message.error('保存发生了一个异常。')
          console.log(e)
        })
        this.dialogFormVisible = false
      },
      _getDeptData () {
        getDeptTree().then((res) => {
          // console.log(res)
          this.data = res.data
        })
      },
      renderContent (h, { node, data, store }) {
        var removeBtn = (<span></span>)
        if (node.childNodes.length === 0) {
          removeBtn = (
            <el-button icon="el-icon-delete" style="font-size: 12px;" type="text" on-click={ () => this._remove(node, data) }></el-button>
          )
        }
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button icon="el-icon-edit" style="font-size: 12px;" type="text" on-click={ () => this._edit(node, data) }></el-button>
              {removeBtn}
            </span>
          </span>)
      },
      _add () {
        this.dialogFormVisible = true
        this.form = {}
        this.cascaderSelectArr = [0]
      },
      _edit (node, data) {
        this.dialogFormVisible = true
        this.cascaderSelectArr = []
        while (node.data.parentId !== 0) {
          node = node.parent
          this.cascaderSelectArr.unshift(node.data.id)
        }
        if (this.cascaderSelectArr.length === 0) {
          this.cascaderSelectArr.push(0)
        }
        this.form = Object.assign({}, data)
      },
      _remove (node, data) {
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDept(data.id).then((res) => {
            if (res.ret) {
              this.$message.success(res.msg)
              this._getDeptData()
            } else {
              this.$message.error('删除出现了一个问题。')
              console.log(res.msg)
            }
          }).catch((e) => {
            this.$message.error('删除发生了一个异常。')
            console.log(e)
          })
        }).catch(() => {})
      }
    },
    created () {
      this._getDeptData()
    }
  }
</script>

<style lang="stylus">
  
</style>
