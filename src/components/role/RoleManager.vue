<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="_add">新增角色</el-button>
      </div>
      <el-tree :data="roles" :props="defaultProps" @node-click="_roleClick" :render-content="renderContent"></el-tree>
    </el-card>

    <el-dialog title="角色管理" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="padding-right:30%;">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" type="textarea" :row="2" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="_submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {saveRole, getRoles, delRole} from 'api/role.js'
  import {mapMutations} from 'vuex'

  export default {
    data () {
      return {
        form: {
          name: '',
          status: '',
          remark: ''
        },
        roles: [], //  部门树数据
        defaultProps: {
          children: 'roleList',
          label: 'name',
          value: 'id'
        },
        statusOption: [{
          value: 0,
          label: '启用'
        }, {
          value: 1,
          label: '停用'
        }],
        formLabelWidth: '120px',
        dialogFormVisible: false
      }
    },
    methods: {
      _add () {
        this.dialogFormVisible = true
        // this.form = {}
        // this.cascaderSelectArr = [0]
      },
      _submit () {
        saveRole(this.form).then((res) => {
          if (res.ret) {
            this.$message.success(res.msg)
            this._getRoles()
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
      _getRoles () {
        getRoles().then((res) => {
          this.roles = res.data
        })
      },
      _roleClick (data, node, com) {
        this.setSelectRole(data)
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
      _edit (node, data) {
        this.dialogFormVisible = true
        this.form = Object.assign({}, data)
      },
      _remove (node, data) {
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delRole(data.id).then((res) => {
            if (res.ret) {
              this.$message.success(res.msg)
              this._getRoles()
            } else {
              this.$message.error('删除出现了一个问题。')
              console.log(res.msg)
            }
          }).catch((e) => {
            this.$message.error('删除发生了一个异常。')
            console.log(e)
          })
        }).catch(() => {})
      },
      ...mapMutations({
        setSelectRole: 'SET_SELECTROLE'
      })
    },
    created () {
      this._getRoles()
    }
  }
</script>

<style lang="stylus">
  
</style>
