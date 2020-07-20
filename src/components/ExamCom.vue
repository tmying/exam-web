<template>
  <div class="exam-com">
    <el-card class="box-card">
      <!-- 头部标题 -->
      <div slot="header">
        <p style="font-size:24px;text-align:center">试卷名称</p>
      </div>
      <!-- 主体内容 -->
      <el-row :gutter="30">
        <!-- 学生信息 -->
        <el-col :span="6">
          <el-card class="box-card" shadow="never" style="margin-left:28px">
            <div slot="header">
              <p style>考生信息</p>
            </div>
            <p>学号：{{this.$store.state.user.account}}</p>
            <p>姓名：{{this.$store.state.user.name}}</p>
          </el-card>
        </el-col>
        <!-- 试卷信息 -->
        <el-col :span="17">
          <el-card class="box-card" shadow="never">
            <div slot="header">
              <p>第1题 -- 选择题（分值：10分）</p>
            </div>
            <p style="font-size:18px;color:#006bb6;font-weight:700">题目：的股份更符合放大后发货</p>
            <p>A：十多个</p>
            <p>B：十多个</p>
            <p>C：十多个</p>
            <p>D：十多个</p>
            <p>答案：<el-input v-model="input" label="回答" placeholder="请输入答案"></el-input></p>
          </el-card>
          <el-card class="box-card" shadow="never">
            <div slot="header">
              <p>第2题 -- 选择题（分值：10分）</p>
            </div>
            <p style="font-size:18px;color:#006bb6;font-weight:700">题目：的股份更符合放大后发货</p>
            <p>A：十多个</p>
            <p>B：十多个</p>
            <p>C：十多个</p>
            <p>D：十多个</p>
            <div>答案：<el-input v-model="input" label="回答" placeholder="请输入答案"></el-input></div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    };
  },
  created(){

  },
};
</script>

<style lang="less">
.exam-com {
  .el-row {
    .el-card {
      border: 0;
      border-radius: 0;
      .el-card__header {
        background: #4da6ff;
        color: #fff;
        text-align: center;
        padding: 0;
        height: 38px;
        line-height: 38px;
      }
      .el-card__body {
        color: #726f70;
        padding: 10px 5px;
        p {
          padding: 10px;
        }
      }
    }
    .el-col-17 {
      //   margin-left: 4px;
      .el-card__header {
        background: #e0e0e0;
        color: #6d6d6d;
        text-align: left;
        text-indent: 10px;
        font-size: 20px;
      }
    }
  }
}
</style>