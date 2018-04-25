<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5"><role-manager></role-manager></el-col>
      <el-col :span="19"><role-relation></role-relation></el-col>
    </el-row>
  </div>
</template>

<script>
  import RoleManager from './RoleManager'
  import RoleRelation from './RoleRelation'

  export default {
    components: {
      RoleManager,
      RoleRelation
    }
  }
</script>

<style lang="stylus">
  
</style>
