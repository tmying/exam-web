<template>
  <div>
    <!-- <h3>退出登录中...</h3> -->
  </div>
</template>

<script>
export default {
  created() {
    // 清除sessionStorage
    sessionStorage.clear();
    // 跳转到登录页面
    setTimeout(()=>{
        this.$router.replace('/')
    },1000)
  }
};
</script>

<style lang="less">
</style>