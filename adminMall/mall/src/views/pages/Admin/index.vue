<template>
  <div class="home">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds='defaultArr'  :default-active='defaultURl'>
            <el-submenu index="bill">
            <template slot="title">菜单管理</template>
            <el-menu-item-group>
              <el-menu-item default="bill">
                <router-link to="/admin/bill">菜单列表</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="combo">
            <template slot="title">菜管理</template>
            <el-menu-item-group>
              <el-menu-item default="combo">
                <router-link to="/admin/combo">菜列表</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="shop">
            <template slot="title">食材管理</template>
            <el-menu-item-group>
              <el-menu-item default="shop">
                <router-link to="/admin/shop">食材列表</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="category">
            <template slot="title">分类管理</template>
            <el-menu-item-group>
              <el-menu-item default="category">
                <router-link to="/admin/category">分类列表</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="attrkey">
            <template slot="title">属性管理</template>
            <el-menu-item-group>
              <el-menu-item default="attrkey">
                <router-link to="/admin/attrkey">属性列表</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
          <el-header>
            <el-dropdown :hide-on-click="false" @command="handleCommand">
              <span class="el-dropdown-link">
                用户名: {{u_name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>
<script>
import { local } from '../../../util/util'
export default {
  name: 'home',
  components: {},
  data () {
    return {
      defaultURl: 'shop',
      defaultArr: [],
      u_name: ''
    }
  },
  created () {
    let href = window.location.href
    let str = href.split('/#')[1].split('/')[2]
    this.defaultUrl = str
    this.defaultArr[0] = str
    this.init()
  },
  methods: {
    init () {
      let userinfo = local.get('userinfo')
      this.u_name = userinfo ? userinfo.u_name : ''
    },
    handleCommand (command) {
      local.clear()
      this.$router.replace({
        path: '/login'
      })
    }
  }
}
</script>
<style lang="scss">
.home{
  a{
    color:unset;
  }
  .el-header{
    border-bottom: 1px solid #eee;
    line-height: 60px;
    text-align: right;
  }
  .router-link-active{
    color:#409eff;
  }
}
</style>
