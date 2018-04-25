<template>
  <div>
    <el-transfer
      v-model="selUsers"
      filterable
      filter-placeholder="请输入用户名"
      :titles="['未绑定的用户', '已绑定的用户']"
      :data="userData"
      :props="props"
    >
      <div slot="right-footer" style="padding: 5px;">
        <el-button class="transfer-footer" size="small" type="primary" style="float:right;" @click="_submit">保存</el-button>
      </div>
    </el-transfer>
  </div>
</template>

<script>
  import {getAllUsers} from 'api/user.js'
  import {changeUsers, getUsersWithRoleId} from 'api/role.js'

  export default {
    props: {
      role: {
        type: Object
      }
    },
    data () {
      return {
        selUsers: [],
        userData: [],
        props: {
          key: 'id',
          label: 'username'
        }
      }
    },
    watch: {
      role () {
        this._getSelectUsers(this.role.id)
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
        changeUsers(this.role.id, this.selUsers).then((res) => {
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
      },
      _getSelectUsers (roleId) {
        getUsersWithRoleId(roleId).then((res) => {
          this.selUsers = res.data.userIds
        })
      }
    },
    created () {
      getAllUsers().then((res) => {
        this.userData = res.data
      })
    }
  }
</script>

<style lang="stylus">
  
</style>
