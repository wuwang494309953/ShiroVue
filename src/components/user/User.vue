<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5"><dept></dept></el-col>
      <el-col :span="19"><user-list></user-list></el-col>
    </el-row>
  </div>
</template>

<script>
  import Dept from './Dept'
  import UserList from './UserList'

  export default {
    components: {
      Dept,
      UserList
    }
  }
</script>

<style lang="stylus">
  
</style>
