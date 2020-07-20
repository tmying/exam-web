<template>
  <div class="index-home">
    <el-card class="box-card">
      <div slot="header">
        <h2>恭喜{{$store.state.user.name}}，登录成功</h2>
      </div>
      <p>
        <span>登录账号：</span>
        {{$store.state.user.account}}
      </p>
      <p>
        <span>身份：</span>
        {{$store.getters.getRole}}
      </p>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.index-home {
  width: 80%;
  margin: 60px auto;
  h2 {
    margin: 8px;
  }
  p {
    font-size: 20px;
    margin: 10px;
    span {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
    &:first-child {
      margin-bottom: 15px;
    }
  }
}
</style>