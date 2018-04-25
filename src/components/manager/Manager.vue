<template>
  <div>
    <el-button type="primary" @click="rePermission">刷新权限缓存</el-button>
  </div>
</template>

<script>
  import {rePermission} from 'api/system'

  export default {
    methods: {
      rePermission () {
        rePermission().then((res) => {
          if (res.ret) {
            this.$notify({
              title: '提示',
              message: res.msg,
              type: 'success',
              duration: 5
            })
          } else {
            this.$notify({
              title: '提示',
              message: '权限刷新失败',
              type: 'error',
              duration: 5
            })
          }
        }).catch((e) => {
          this.$notify({
            title: '提示',
            message: '权限刷新时出现了一个异常',
            type: 'error',
            duration: 5
          })
        })
      }
    }
  }
</script>

<style lang="stylus">
  
</style>
