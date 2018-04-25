<template>
  <div id="main">
    <el-container style="height: 100%;">
      <el-header>
        <h1>
          <a href="#">Shiro</a>
        </h1>
      </el-header>
      <el-container>
        <el-aside style="width: auto;overflow: visible;">
          <el-button type="text" style="width: 100%;" @click="changeNav">
            <i class="el-icon-arrow-left nav-icon" ref="navIcon" :style="{transform: roz}"></i>
          </el-button>
          <el-menu
            default-active="/"
            :router = "true"
            :unique-opened="true"
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="border-right: none;">
            <el-submenu v-for="item in slideData" :key="item.name" v-if="item.children" :index="item.path">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="item1 in item.children" :key="item1.name" :index="item1.path">
                  {{item1.name}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.path">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      isCollapse: false,
      roz: 'rotateZ(0deg)',
      slideData: [
        {
          name: '首页',
          path: '/index',
          icon: 'el-icon-location',
          children: [
            {
              name: '子菜单1',
              path: '/index'
            },
            {
              name: '子菜单2',
              path: '/role'
            }
          ]
        },
        {
          name: '权限管理',
          path: '/user',
          icon: 'el-icon-menu',
          children: [
            {
              name: '用户管理',
              path: '/user'
            },
            {
              name: '角色管理',
              path: '/role'
            },
            {
              name: '权限管理',
              path: '/acl'
            },
            {
              name: '系统管理',
              path: '/manager'
            }
          ]
        }
      ]
    }
  },
  methods: {
    changeNav () {
      this.isCollapse = !this.isCollapse
      this.roz = this.isCollapse ? 'rotateZ(-90deg)' : 'rotateZ(0deg)'
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .el-menu-vertical-demo:not(.el-menu--collapse)
    width: 200px
    min-height: 400px
  #main
    position: absolute
    width: 100%
    top: 0
    left: 0
    bottom: 0
    .el-header
      background-color: $color-background
      h1
        float: left
        width: 150px
        padding-left: 50px
        a
          display: block
          .head-img
            width: 30px
    .el-aside
      background-color: $color-background
    .nav-icon
      transition: transform 1s
</style>
