<template>
  <div class="left-menu">
    <!-- 导航logo -->
    <img src="../assets/imgs/logo.png" alt />
    <!-- 导航菜单 -->
    <el-menu
      router
      unique-opened
      :default-active="this.$route.path"
      background-color="#304155"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/index">
        <i class="el-icon-setting"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/index/mypaper" v-if="$store.state.user.role==1">
        <i class="el-icon-edit"></i>
        <span slot="title">我的试卷</span>
      </el-menu-item>
      <!-- 循环菜单根节点  index：菜单的唯一标识，控制菜单的展开和关闭 -->
      <template v-for="menu in menulist">
        <el-submenu v-if="$store.state.user.role==0" :key="menu.index" :index="menu.index">
          <template slot="title">
            <i :class="menu.cls"></i>
            {{menu.title}}
          </template>
          <!-- 循环子菜单  index：菜单的唯一标识，激活导航时作为 path 进行路由跳转 -->
          <el-menu-item v-for="v in menu.children" :key="v.index" :index="v.index">{{v.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 动态菜单数据
      menulist: [
        {
          index: "1",
          cls: "el-icon-s-custom",
          title: "学生管理",
          children: [
            { index: "/index/studentadd", name: "新增学生" },
            { index: "/index/studentlist", name: "学生列表" }
          ]
        },
        {
          index: "2",
          cls: "el-icon-circle-plus",
          title: "题库管理",
          children: [
            { index: "/index/questionadd", name: "新增试题" },
            { index: "/index/questionlist", name: "试题列表" }
          ]
        },
        {
          index: "3",
          cls: "el-icon-success",
          title: "试卷管理",
          children: [
            { index: "/index/paperadd", name: "新增试卷" },
            { index: "/index/paperlist", name: "试卷列表" }
          ]
        },
        {
          index: "4",
          cls: "el-icon-s-data",
          title: "图表统计",
          children: [
            { index: "/index/chartpaper", name: "试卷统计" },
            { index: "/index/chartstudent", name: "学生统计" }
          ]
        }
      ]
    };
  },
};
</script>

<style lang="less">
.left-menu {
  img {
    display: block;
    width: 100%;
    height: 60px;
    background: #304155;
  }
  .el-menu {
    border: 0;
  }
}
</style>