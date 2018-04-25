<template>
  <div>
    <el-popover
      ref="popover1"
      width="200"
      trigger="hover"
      content="请从右边角色列表中选取一个角色.">
    </el-popover>

    <el-card class="box-card">
      <div style="margin-bottom:15px;">
        <span>当前选中的角色:</span>
        <el-button v-popover:popover1>{{roleName}}</el-button>
      </div>
      <el-tabs tab-position="left">
        <el-tab-pane label="角色与权限"><role-acl  :role="selectRole"></role-acl></el-tab-pane>
        <el-tab-pane label="角色与用户"><role-user :role="selectRole"></role-user></el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
  import RoleAcl from './RoleAcl'
  import RoleUser from './RoleUser'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      roleName () {
        if (!this.selectRole.name) {
          return '请选择角色'
        }
        return this.selectRole.name
      },
      ...mapGetters([
        'selectRole'
      ])
    },
    components: {
      RoleAcl,
      RoleUser
    }
  }
</script>

<style lang="stylus">
  
</style>
