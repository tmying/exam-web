<template>
  <div class="index">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(v,i) in this.$route.meta" :key="i">{{v}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 头像信息 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              {{storeUser.name}}（{{storeUser.account}}）
              <el-avatar :size="50" :src="headImg"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a href="#/index/changePwd" v-if="storeUser.role==1">修改密码</a></el-dropdown-item>
              <el-dropdown-item><router-link to='/logout'>退出登录</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!-- 主体内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import headImg from "../assets/imgs/avatar.jpg";
import { cheLogin } from "@/apis";
export default {
  components: {
    LeftMenu
  },
  data() {
    return {
      headImg: headImg,
    };
  },
  created() {
    // 应用vuex 这段代码解决初始化页面时无数据【待优化】
    let tokenId = sessionStorage.getItem("token"); //获取token字符串
    let obj = { tokenId }; //自定义对象，作为axios请求参数
    cheLogin(obj).then(data => {
      if (data.code) {
        this.$store.commit({
          type: "getInfo",
          info: data.data
        });
      }
    });
  },
  computed: {
    // 简化调用store中的数据
    storeUser(){
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="less">
.index {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background: #304155;
    }
    .el-header {
      background: #fff;
      display: flex;
      justify-content: space-between;
      .el-breadcrumb {
        line-height: 60px;
        .el-breadcrumb__inner {
          font-size: 18px;
        }
      }
      .el-dropdown-link {
        cursor: pointer;
        font-size: 18px;
        .el-avatar {
          vertical-align: middle;
          margin-top: 5px;
        }
      }
    }
    .el-main {
      padding: 30px;
    }
  }
}
.el-dropdown-menu {
  width: 155px;
  background: #eee;
  text-align: center;
}
</style>