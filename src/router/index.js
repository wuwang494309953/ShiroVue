import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Index'
import Role from '@/components/role/Role'
import User from '@/components/user/User'
import Acl from '@/components/acl/Acl'
import Login from '@/components/login/Login'
import Main from '@/components/main/Main'
import Manager from '@/components/manager/Manager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: '/role',
          name: 'role',
          component: Role
        },
        {
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/acl',
          name: 'acl',
          component: Acl
        },
        {
          path: '/manager',
          name: 'manager',
          component: Manager
        }
      ]
    }
  ]
})
