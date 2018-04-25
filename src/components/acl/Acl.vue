<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5"><acl-module></acl-module></el-col>
      <el-col :span="19"><acl-single></acl-single></el-col>
    </el-row>
  </div>
</template>

<script>
  import AclModule from './AclModule'
  import AclSingle from './AclSingle'

  export default {
    components: {
      AclModule,
      AclSingle
    }
  }
</script>

<style lang="stylus">
  
</style>
