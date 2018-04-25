<template>
  <div v-loading="loading">
    <div style="margin-bottom: 5px;">
      <el-button type="primary" @click="_submit">保存</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="_handleNodeClick"
          show-checkbox
          accordion
          node-key="id"
          ref="tree"
        >
        </el-tree>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">权限点展示</div>
          <el-tree :data="expositionData" v-loading="expositionLoading" :props="defaultProps"></el-tree>
        </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
  import {getAclModuleTree, getAclModuleIdsWithRoleId} from 'api/aclModule'
  import {getAclWithModule} from 'api/acl'
  import {changeAcls} from 'api/role'

  export default {
    props: {
      role: {
        type: Object
      }
    },
    data () {
      return {
        loading: false,
        data: [],
        defaultProps: {
          children: 'aclModuleList',
          label: 'name',
          value: 'id'
        },
        expositionLoading: false,
        expositionData: []
      }
    },
    watch: {
      role () {
        this._getSelectAcls(this.role.id)
      }
    },
    methods: {
      _submit () {
        if (!this.role.id) {
          this.$notify({
            title: '错误',
            type: 'error',
            message: '请从右边角色列表中选取一个角色.',
            duration: 5000
          })
          return
        }
        changeAcls(this.role.id, this.$refs.tree.getCheckedKeys(true)).then((res) => {
          if (res.ret) {
            this.$message.success(res.msg)
          } else {
            this.$message.error('保存出现了一个问题。')
            console.log(res.msg)
          }
        }).catch((e) => {
          this.$message.error('保存发生了一个异常。')
          console.log(e)
        })
        // console.log(this.$refs.tree.getCheckedKeys(true))
      },
      _getSelectAcls (roleId) {
        this.loading = true
        getAclModuleIdsWithRoleId(roleId).then((res) => {
          this.loading = false
          if (res.ret) {
            this.$refs.tree.setCheckedKeys(res.data.aclIds)
          }
        })
      },
      _getAclModules () {
        getAclModuleTree().then((res) => {
          if (res.ret) {
            this.data = res.data
          }
        })
      },
      _handleNodeClick (data) {
        if (!data.aclModuleList) {
          this.expositionLoading = true
          getAclWithModule(data.id).then((res) => {
            this.expositionData = res.data
            this.expositionLoading = false
          }).catch((e) => {
            this.expositionLoading = false
          })
        } else {
          this.expositionData = []
        }
      }
    },
    created () {
      this._getAclModules()
    }
  }
</script>

<style lang="stylus">
  
</style>
